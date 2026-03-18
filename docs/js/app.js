
    const schema = {
  "asyncapi": "3.0.0",
  "id": "urn:iqb-specifications:coding-scheme",
  "defaultContentType": "application/json",
  "info": {
    "title": "coding-scheme",
    "description": "Rules and instructions for coding assessment output.",
    "license": {
      "name": "CC0 1.0",
      "url": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "version": " - click on schema id to expand",
    "contact": {
      "name": "Home of iqb-specifications (German only)",
      "url": "https://iqb-specifications.github.io/"
    }
  },
  "channels": {
    "iqb_data_structures": {
      "address": "iqb_data_structures",
      "messages": {
        "select_schema": {
          "payload": {
            "$id": "coding-scheme@iqb-standard@3.4",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Coding Scheme",
            "description": "Data structure to specify all processing steps of response data in order to get coded and scored data for analyses.",
            "type": "object",
            "properties": {
              "version": {
                "type": "string",
                "description": "Major and minor of the version of the data structure.",
                "pattern": "^\\d+\\.\\d+$",
                "examples": [
                  "3.5",
                  "4.10"
                ],
                "x-parser-schema-id": "<anonymous-schema-1>"
              },
              "variableCodings": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "Identifier for the variable. In case of a scheme for a base variable, this id is identical with the source variable's id. All ids of a response scheme should be unique.",
                      "pattern": "^[0-9a-zA-Z_-]+$",
                      "x-parser-schema-id": "<anonymous-schema-4>"
                    },
                    "alias": {
                      "type": "string",
                      "description": "Alternative identifier for the variable. In case of a scheme for a base variable, this id is identical with the source variable's alternative id. All alternative ids of a response scheme should be unique.",
                      "pattern": "^[0-9a-zA-Z_-]+$",
                      "x-parser-schema-id": "<anonymous-schema-5>"
                    },
                    "label": {
                      "type": "string",
                      "description": "Some additional info for UI",
                      "x-parser-schema-id": "<anonymous-schema-6>"
                    },
                    "sourceType": {
                      "type": "string",
                      "description": "Specifies how to derive (concatenate, check uniqueness, sum code etc.).",
                      "enum": [
                        "BASE",
                        "BASE_NO_VALUE",
                        "MANUAL",
                        "COPY_VALUE",
                        "CONCAT_CODE",
                        "SUM_CODE",
                        "SUM_SCORE",
                        "UNIQUE_VALUES",
                        "SOLVER"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-7>"
                    },
                    "sourceParameters": {
                      "type": "object",
                      "description": "Parameters to specify the derive method",
                      "properties": {
                        "solverExpression": {
                          "type": "string",
                          "description": "If sourceType 'solver', this expression is evaluated when deriving. Placeholder for variables are in curly brakes.",
                          "examples": [
                            "${01}*${03}-100"
                          ],
                          "x-parser-schema-id": "<anonymous-schema-9>"
                        },
                        "processing": {
                          "type": "array",
                          "description": "Some options to change value or status",
                          "items": {
                            "type": "string",
                            "enum": [
                              "TO_LOWER_CASE",
                              "TO_NUMBER",
                              "REMOVE_ALL_SPACES",
                              "REMOVE_DISPENSABLE_SPACES",
                              "TAKE_DISPLAYED_AS_VALUE_CHANGED",
                              "TAKE_NOT_REACHED_AS_VALUE_CHANGED",
                              "TAKE_EMPTY_AS_VALID",
                              "SORT"
                            ],
                            "x-parser-schema-id": "<anonymous-schema-11>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-10>"
                        }
                      },
                      "additionalProperties": false,
                      "x-parser-schema-id": "<anonymous-schema-8>"
                    },
                    "deriveSources": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "pattern": "^[0-9a-zA-Z_-]+$",
                        "x-parser-schema-id": "<anonymous-schema-13>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-12>"
                    },
                    "processing": {
                      "type": "array",
                      "description": "This parameter defines what (pre)processing should be done.",
                      "items": {
                        "type": "string",
                        "enum": [
                          "IGNORE_CASE",
                          "IGNORE_ALL_SPACES",
                          "IGNORE_DISPENSABLE_SPACES",
                          "SORT_ARRAY",
                          "REPLAY_REQUIRED",
                          "CODER_TRAINING_REQUIRED",
                          "ATTACHMENT"
                        ],
                        "x-parser-schema-id": "<anonymous-schema-15>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-14>"
                    },
                    "fragmenting": {
                      "type": "string",
                      "description": "Regular expression to get fragments out of the value if of type string",
                      "x-parser-schema-id": "<anonymous-schema-16>"
                    },
                    "manualInstruction": {
                      "type": "string",
                      "description": "Instructions for manual coding.",
                      "x-parser-schema-id": "<anonymous-schema-17>"
                    },
                    "codeModel": {
                      "type": "string",
                      "enum": [
                        "MANUAL_AND_RULES",
                        "RULES_ONLY",
                        "MANUAL_ONLY"
                      ],
                      "description": "Info for applications to simplify UI",
                      "x-parser-schema-id": "<anonymous-schema-18>"
                    },
                    "page": {
                      "type": "string",
                      "description": "If the unit supports paging, this property defines the page to be presented to the coder if manually coded.",
                      "x-parser-schema-id": "<anonymous-schema-19>"
                    },
                    "codes": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "oneOf": [
                              {
                                "type": "integer",
                                "x-parser-schema-id": "<anonymous-schema-23>"
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "INVALID",
                                  "INTENDED_INCOMPLETE"
                                ],
                                "x-parser-schema-id": "<anonymous-schema-24>"
                              }
                            ],
                            "description": "If this code's rules/instructions match, the code and score is taken for the response. If the code id is of type 'string', the status 'INVALID' or 'INTENDED_INCOMPLETE' will be set.",
                            "x-parser-schema-id": "<anonymous-schema-22>"
                          },
                          "type": {
                            "type": "string",
                            "enum": [
                              "UNSET",
                              "FULL_CREDIT",
                              "PARTIAL_CREDIT",
                              "TO_CHECK",
                              "NO_CREDIT",
                              "RESIDUAL",
                              "RESIDUAL_AUTO",
                              "INTENDED_INCOMPLETE"
                            ],
                            "description": "To ease some processing and documentation",
                            "x-parser-schema-id": "<anonymous-schema-25>"
                          },
                          "label": {
                            "type": "string",
                            "x-parser-schema-id": "<anonymous-schema-26>"
                          },
                          "score": {
                            "type": "integer",
                            "x-parser-schema-id": "<anonymous-schema-27>"
                          },
                          "manualInstruction": {
                            "type": "string",
                            "description": "Instructions for manual coding.",
                            "x-parser-schema-id": "<anonymous-schema-28>"
                          },
                          "ruleSetOperatorAnd": {
                            "type": "boolean",
                            "description": "If true, all rule sets must match to take that code. Otherwise (default: false), one matching rule set will satisfy.",
                            "x-parser-schema-id": "<anonymous-schema-29>"
                          },
                          "ruleSets": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "valueArrayPos": {
                                  "anyOf": [
                                    {
                                      "type": "integer",
                                      "description": "Refers to a specific position in the value array [0..n-1].",
                                      "x-parser-schema-id": "<anonymous-schema-33>"
                                    },
                                    {
                                      "type": "string",
                                      "description": "Refers to any position in the value array, to the sum of all array values or the length of the value array.",
                                      "enum": [
                                        "ANY",
                                        "ANY_OPEN",
                                        "SUM",
                                        "LENGTH"
                                      ],
                                      "x-parser-schema-id": "<anonymous-schema-34>"
                                    }
                                  ],
                                  "x-parser-schema-id": "<anonymous-schema-32>"
                                },
                                "ruleOperatorAnd": {
                                  "type": "boolean",
                                  "description": "If true, all rules must match to take that code. Otherwise (default: false), one matching rule will satisfy.",
                                  "x-parser-schema-id": "<anonymous-schema-35>"
                                },
                                "rules": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "fragment": {
                                        "type": "integer",
                                        "description": "Refers to a specific fragment of the value [0..n-1] or to any -1.",
                                        "x-parser-schema-id": "<anonymous-schema-38>"
                                      },
                                      "method": {
                                        "type": "string",
                                        "description": "Condition for evaluation",
                                        "enum": [
                                          "MATCH",
                                          "MATCH_REGEX",
                                          "NUMERIC_MATCH",
                                          "NUMERIC_FULL_RANGE",
                                          "NUMERIC_RANGE",
                                          "NUMERIC_LESS_THAN",
                                          "NUMERIC_MORE_THAN",
                                          "NUMERIC_MAX",
                                          "NUMERIC_MIN",
                                          "IS_EMPTY",
                                          "IS_NULL",
                                          "IS_TRUE",
                                          "IS_FALSE"
                                        ],
                                        "x-parser-schema-id": "<anonymous-schema-39>"
                                      },
                                      "parameters": {
                                        "type": "array",
                                        "description": "Depending on the method, additional parameter(s) is needed. See separate documentation",
                                        "items": {
                                          "type": "string",
                                          "x-parser-schema-id": "<anonymous-schema-41>"
                                        },
                                        "x-parser-schema-id": "<anonymous-schema-40>"
                                      }
                                    },
                                    "additionalProperties": false,
                                    "required": [
                                      "method"
                                    ],
                                    "x-parser-schema-id": "<anonymous-schema-37>"
                                  },
                                  "x-parser-schema-id": "<anonymous-schema-36>"
                                }
                              },
                              "additionalProperties": false,
                              "required": [
                                "rules"
                              ],
                              "x-parser-schema-id": "<anonymous-schema-31>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-30>"
                          }
                        },
                        "additionalProperties": false,
                        "required": [
                          "id"
                        ],
                        "x-parser-schema-id": "<anonymous-schema-21>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-20>"
                    }
                  },
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "sourceType"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-3>"
                },
                "x-parser-schema-id": "<anonymous-schema-2>"
              }
            },
            "additionalProperties": false,
            "required": [
              "version",
              "variableCodings"
            ],
            "x-parser-schema-id": "coding-scheme@iqb-standard@3.4"
          },
          "x-parser-unique-object-id": "select_schema",
          "x-parser-message-name": "select_schema"
        }
      },
      "x-parser-unique-object-id": "iqb_data_structures"
    }
  },
  "components": {
    "schemas": {
      "response": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload"
    }
  },
  "x-parser-spec-parsed": true,
  "x-parser-api-version": 3,
  "x-parser-spec-stringified": true
};
    const config = {"show":{"sidebar":false},"sidebar":{"showOperations":"byDefault"},"showOperations":false};
    const appRoot = document.getElementById('root');
    AsyncApiStandalone.render(
        { schema, config, }, appRoot
    );
  