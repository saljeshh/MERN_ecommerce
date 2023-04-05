class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    // we can do .keyword here OR in prouctConsrtoller > get all product req.query.keyword
    const keyword = this.queryStr.keyword
      ? {
          name: {
            // check in mongo db website
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    //console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    // if we dont use spread operator and simply do this.query it will only reutrn reference of the object not copy new data in heap.
    const queryCopy = { ...this.queryStr };

    // before removing
    console.log(queryCopy);

    // remove some filelds for categry;
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);
    //console.log(queryCopy);

    // filter for price and rating

    // converting to string
    let queryStr = JSON.stringify(queryCopy);
    // writing regular expression

    // for price sorting greater then ewual to gte in mongo db but need $ in front of operator in mongo db
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    // this is like writing operator in mongo .find({name :"saljesh"})

    //console.log(queryStr);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; //50 products . per page 10,  5 pages

    // if in second page we need to skip 10 pages
    const skip = resultPerPage * (currentPage - 1);

    // query meaans Prduct.Find
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
