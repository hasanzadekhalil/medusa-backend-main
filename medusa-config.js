const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) { }

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_TYPE = process.env.DATABASE_TYPE || "sqlite";
const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-store";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const inventory_required = 10;

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  `medusa-plugin-wishlist`,
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
    },
  },
  {
    resolve: `medusa-payment-paypal`,
    options: {
      sandbox: process.env.PAYPAL_SANDBOX,
      client_id: process.env.PAYPAL_CLIENT_ID,
      client_secret: process.env.PAYPAL_CLIENT_SECRET,
      auth_webhook_id: process.env.PAYPAL_AUTH_WEBHOOK_ID,
    },
  },
  {
    resolve: `medusa-payment-paytm`,
    options: {
      merchant_id: process.env.PAYTM_MERCHANT_ID,
      merchant_key: process.env.PAYTM_MERCHANT_KEY,
      test_mode: process.env.PAYTM_TEST_MODE,
      callback_url: process.env.PAYTM_CALLBACK_HOOK_URL,
    },
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },
  // {
  //   resolve: `medusa-plugin-restock-notification`,
  //   options: {
  //     inventory_required, // minimum inventory quantity to consider a variant as restocked
  //   },
  // },
  {
    resolve: `medusa-plugin-sendgrid`,
    options: {
      api_key: process.env.SENDGRID_API_KEY,
      from: process.env.SENDGRID_FROM,
      order_placed_template: process.env.SENDGRID_ORDER_PLACED_ID,
      localization: {
        "en-in": {
          // locale key
          order_placed_template: process.env.SENDGRID_ORDER_PLACED_ID_LOCALIZED,
        },
      },
    },
  },

  {
    resolve: `medusa-plugin-meilisearch`,
    options: {
      config: {
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_API_KEY,
      },
      settings: {
        products: {
          indexSettings: {
            searchableAttributes: ["title", "description", "variant_sku"],
            displayedAttributes: [
              "title",
              "description",
              "variant_sku",
              "thumbnail",
              "handle",
            ],
          },
          primaryKey: "id",
          transform: (product) => ({
            id: product.id,

            // other attributes...
          }),
        },
      },
    },
  },
  {
    resolve: `medusa-file-s3`,
    options: {
      s3_url: process.env.S3_URL,
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
      access_key_id: process.env.S3_ACCESS_KEY_ID,
      secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
      aws_config_option: {},
    },
  },
  {
    resolve: `medusa-plugin-segment`,
    options: {
      write_key: process.env.SEGMENT_WRITE_KEY,
    },
  },
  {
    resolve: `medusa-plugin-whatsapp-cloud-api`,
    options: {
      accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
      WABA_ID: process.env.WHATSAPP_WABA_ID,
      senderPhoneNumberId: process.env.WHATSAPP_SENDER_ID,
      graphAPIVersion: process.env.WHATSAPP_GRAPH_API_VERSION,
    },
  },
  {
    resolve: `medusa-fulfillment-shiprocket`,
    options: {
      channel_id: process.env.SHIPROCKET_CHANNEL_ID,
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
      token: "",
      pricing: "calculated",
      //"flat_rate" or "calculated" (required)
      length_unit: "cm",
      //"mm", "cm" or "inches" (required)
      multiple_items: "single_shipment",
      //"single_shipment" or "split_shipment"(default) (required)
      inventory_sync: true,
      forward_action: "create_order",
      //'create_fulfillment' or 'create_order'(default) (required)
      return_action: "create_order",
      //'create_fulfillment' or 'create_order'(default) (required)
    },
  },
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  inventoryService: {
    resolve: "@medusajs/inventory",
  },
  stockLocationService: {
    resolve: "@medusajs/stock-location",
  },
}

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  database_database: "./medusa-db.sql",
  database_type: DATABASE_TYPE,
  store_cors: STORE_CORS,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  redis_url: REDIS_URL
}

if (DATABASE_URL && DATABASE_TYPE === "postgres") {
  projectConfig.database_url = DATABASE_URL;
  delete projectConfig["database_database"];
}



/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
  featureFlags: {
    product_categories: true
  }
};
