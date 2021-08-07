const ExchangeRate = require("./models/mongo/ExchangeRate");
const { Scrapper, MongooseGenerator } = require("./scrapper");

new Scrapper(
  {
    url:"http://api.exchangeratesapi.io/v1/latest?access_key=ea595f24982bc843bb0a7f344e200a55&format=1"
  },
  (data) => data,
  (data) => MongooseGenerator(data, ExchangeRate)
).scrap();
