var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate'),
	Schema = mongoose.Schema;

var hotelsSchema = new Schema({
	id: { type: String },
    description: {type: String },
    name: { type: String },
    geo_position: { type: Object,
      properties: {
        latitude: { type: Number },
        longitude: { type: Number }
      }
    },
    images: { type: Array,
      items: { type: Object,
        properties: {
          id: { type: String },
          url: { type: String }
        }
      }
    },
    amenities: {
      type: Array,
      items: {
        type: Object,
        properties: {
          code: { type: String },
          description: { type: String }
        }
      }
    },
    stars: { type: Number },
    recommended: { type: Boolean },
    checkin_time: { type: String },
    checkout_time: { type: String },
    hotel_chain: { type: String },
    rating_summary: { type: Object,
      properties: {}
    },
    rate: { type: Object,
      properties: {
        id: { type: String },
        price: { type: Object,
          properties: {
            per_night: { type: Number },
            total: { type: Number },
            discount: {type: Object,
              properties: {
                amount: { type: Number },
                percentage: { type: Number }
              }
            },
            currency: { type: Object,
              properties: {
                id: { type: Number },
                code: { type: String },
                mask: { type: String },
                ratio: { type: Number }
              }
            },
            price_without_discount: {
              type: Number
            },
            price_per_night_per_room: {
              type: Number
            },
            total_with_operation_cost: {
              type: Number
            },
            charges: {
              type: Array,
              items: {
                type: Object,
                properties: {
                  amount: {
                    type: Number
                  },
                  type: {
                    type: String
                  },
                  description: {
                    type: String
                  },
                  included: {
                    type: Boolean
                  }
                }
              }
            },
            show_amount: {
              type: Number
            },
            show_amount_per_night_per_room: {
              type: Number
            },
            show_amount_with_operation_cost: {
              type: Number
            },
            show_amount_per_night_per_room_without_discount: {
              type: Number
            }
          }
        },
        smoking_preference: {
          type: Object,
          properties: {}
        },
        meal_plan: {
          type: Object,
          properties: {
            code: {
              type: String
            },
            description: {
              type: String
            }
          }
        },
        payment_method: {
          type: Object,
          properties: {
            code: {
              type: String
            },
            description: {
              type: String
            }
          }
        },
        refundable: {
          type: Boolean
        },
        promotion: {
          type: String
        },
        status: {
          type: String
        },
        cancel_policies: {
          type: Array,
          items: {}
        },
        free_cancel_date: {
          type: Object,
          properties: {
            date: {
              type: Number
            },
            month: {
              type: String
            },
            monthNumber: {
              type: Number
            },
            day: {
              type: String
            },
            year: {
              type: Number
            },
            plain: {
              type: String
            }
          }
        }
      }
    },
    payment_methods: {
      type: Array,
      items: {
        type: Object,
        properties: {
          code: {
            type: String
          },
          description: {
            type: String
          }
        }
      }
    },
    slug: {
      type: String
    },
    defaultPaymentMethod: {
      type: String
    }    
});
hotelsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('hotels', hotelsSchema);