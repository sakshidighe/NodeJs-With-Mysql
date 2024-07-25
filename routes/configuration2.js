const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const service = require("../services/configuration2.services");
const requestResponsehelper = require("@baapcompany/core-api/helpers/requestResponse.helper");
const ValidationHelper = require("@baapcompany/core-api/helpers/validation.helper");

const numberOfRecords = 1000; // Adjust this number as needed


router.post("/", async (req, res, next) => {
  try {
    // Validate incoming request (if required)
    if (ValidationHelper.requestValidationErrors(req, res)) {
      return;
    }
 
    const results = [];
    for (let i = 1; i <= numberOfRecords; i++) {
      const job = {
        id: i, // Assign sequential ID
        name: `Configuration ${i}`, // Example name
      };
 
      // Insert each worker into the database
      const serviceResponse = await service.create(job);
      results.push(serviceResponse);
    }
 
    requestResponsehelper.sendResponse(res, results);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
});

router.get("/all/configurations", async (req, res) => {
  const queryCondition = req.query.condition || '1=1';
  const pagination = {
    pageNumber: parseInt(req.query.pageNumber, 10) || 1,
    pageSize: parseInt(req.query.pageSize, 10) || 500
  };

  const serviceResponse = await service.getAllByCriteria(queryCondition, pagination);
  requestResponsehelper.sendResponse(res, serviceResponse);
});
 

router.delete("/:id", async (req, res) => {
    const serviceResponse = await service.deleteById(req.params.id);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.put("/:id", async (req, res) => {
    const serviceResponse = await service.updateById(req.params.id, req.body);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/:id", async (req, res) => {
    const serviceResponse = await service.getById(req.params.id);

    requestResponsehelper.sendResponse(res, serviceResponse);
});

router.get("/all/jobs", async (req, res) => {
    const queryCondition = req.query.condition || '1=1';
    const pagination = {
      pageNumber: parseInt(req.query.pageNumber, 10) || 1,
      pageSize: parseInt(req.query.pageSize, 10) || 500
    };
  
    const serviceResponse = await service.getAllByCriteria(queryCondition, pagination);
    requestResponsehelper.sendResponse(res, serviceResponse);
  });

module.exports = router;
