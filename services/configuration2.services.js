
const sequelize = require('../db/db2.connection'); 
const Configuration = require('../schema/configuration2.schema');
const { Sequelize } = require('sequelize');
class ConfigurationService {
  
  constructor() {
    this.tableName = Configuration.getTableName();
  }
  
  async create(config) {
    try {
      const newJob = await Configuration.create(config);
      return {
        data: newJob
      };
    } catch (error) {
      console.error('Error creating job:', error);
      return {
        isError: true,
        message: error.message
      };
    }
  }

  async getById(id) {
    try {
      const job = await Configuration.findByPk(id);
      return {
        data: job
      };
    } catch (error) {
      console.error('Error fetching job by id:', error);
      return {
        isError: true,
        message: error.message
      };
    }
  }

  
  validateAndSanitizePaginationProps(pagination) {
    if (!pagination.pageNumber) {
        pagination.pageNumber = 1;
    }
    if (+pagination.pageNumber <= 0) {
        return new ServiceResponse({
            isClientError: true,
            message: `Page Number should be a positive integer`,
        });
    }

    if (!pagination.pageSize) {
        pagination.pageSize = 500;
    }
    if (+pagination.pageSize <= 0) {
        return new ServiceResponse({
            isClientError: true,
            message: `Page size should be a positive integer`,
        });
    }

    return null;
}

async getAllByCriteria(queryCondition = '1=1', pagination = {}) {
  const paginationErrors = this.validateAndSanitizePaginationProps(pagination);
  if (paginationErrors) {
    return paginationErrors;
  }

  const { pageNumber, pageSize } = pagination;
  queryCondition = String(queryCondition).trim();
  const query = `SELECT * FROM ${this.tableName} WHERE ${queryCondition} LIMIT :pageSize OFFSET :offset`;
  const values = {
    pageSize: pageSize,
    offset: pageSize * (pageNumber - 1)
  };

  return this.execute(query, values, true);
}

async execute(query, values, isSelect = false) {
try {
  const results = await sequelize.query(query, {
    replacements: values,
    type: isSelect ? Sequelize.QueryTypes.SELECT : Sequelize.QueryTypes.RAW
  });
  return {
    data: results
  };
} catch (error) {
  console.error('Error executing query:', error);
  return {
    isError: true,
    message: error.message
  };
}
}
}

module.exports = new ConfigurationService();
