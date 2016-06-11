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
      	response.render("index");
    }
}

let indexController = new IndexController();

module.exports = indexController;
