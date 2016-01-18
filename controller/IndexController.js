"use strict";

/**
 * IndexController for MarkNote
 */
class IndexController
{
  /**
   * index page
   */
    index (request, response) {
      	response.render("index", {title : config.title});
    }
}

let indexController = new IndexController();

module.exports = indexController;
