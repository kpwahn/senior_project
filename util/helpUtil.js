exports.help = function(callback) {
	helpMessage = {
		status: 200,
		base_URL : "https://kpwahnschaffe.com/",
		last_Updated : "December 2, 2016",
		endpoints : {
			"http://kpwahnschaffe.com/*" : {
				"method" : "GET",
				"requires_authentication" : false,
				"description" : "(http) Returns the default static website, no matter the route. Cannot access API with http"
			},
			"/" : {
				"method" : "GET",
				"requires_authentication" : false,
				"description" : "Returns the default static website"
			},
			"/help" : {
				"method" : "GET",
				"requires_authentication" : false,
				"description" : "Returns JSON explaining the API"
			},
			"/createNewMember" : {
				"method" : "POST",
				"requires_authentication" : false,
				"description" : "",
				"keys" : [{key : "member_name",
						   "optional" : false}, 
						  { "key" : "username", 
						   "optional" : false}, 
						  { "key" : "password", 
						   "optional" : false}] 
			},
			"/makeTransaction" : {
				"method" : "POST",
				"requires_authentication" : true,
				"description" : "Endpoint used to make transactions. After type is selected, additional keys may be necessary",
				"keys" : [{key : "member_id",
						   "optional" : false}, 
						  { "key" : "token", 
						   "optional" : false}, 
						  { "key" : "type",
						   "possible_values" : ["purchase", "transfer", "deposit", "withdraw"],
						   "optional" : false}, 
						  { "key" : "amount", 
						   "optional" : false}] 
			},
			"/getAccounts" : {
				"method" : "POST",
				"requires_authentication" : true,
				"description" : "Endpoint returns all the accounts for the provided member",
				"keys" : [{key : "member_id",
						   "optional" : false}]
			},
			"/createAccount" : {
				"method" : "POST",
				"requires_authentication" : true,
				"description" : "Enpoint used to create accounts for existing members",
				"keys" : [{ "key" : "member_id", 
						   "optional" : false}, 
						  { "key" : "token", 
						   "optional" : false},
						  {key : "account_name",
						   "optional" : false}, 
						  { "key" : "account_type",
						   "possible_values" : ["savings", "checking"],
						   "optional" : false}, 
						  { "key" : "inital_balance", 
						   "optional" : false}] 
			},
			"/authenticate" : {
				"method" : "POST",
				"requires_authentication" : false,
				"description" : "Enpoint used to authenticate users",
				"keys" : [{key : "username", 
						   "optional" : false}, 
						  { "key" : "password", 
						   "optional" : false}]
			}
		}
	}
	return callback(helpMessage);
}


/*
# Example YAML to get you started quickly.
# Be aware that YAML has indentation based scoping.
# Code completion support is available so start typing for available options.
swagger: '2.0'

# This is your document metadata
info:
  version: "0.1.0"
  title: Bank API
  
host: kpwahnschaffe.com
basePath: /

schemes:
  - https
  
  
# Describe your paths here
paths:

  /authenticate:
    post:
      # Describe this verb here. Note: you can use markdown
      description: |
        Endpoint used to authenticate users
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: username
          in: query
          description: Desired username of the new member
          required: true
          type: string
        - name: password
          in: query
          description: Desired password of the new member
          required: true
          type: string
          
      # Expected responses for this operation:
      responses:
        # Response code
        200:
          description: Successfully authenticated user
          schema:
            properties:
              token:
                type: string
              member_id:
                type: string
        400:
          description: Malformed JSON

  /createNewMember:
    post:
      # Describe this verb here. Note: you can use markdown
      description: |
        Creates a new member account
      consumes:
        - application/json
      produces:
        - application/json
      
      parameters:
        - name: member_name
          in: query
          description: Full name of member
          required: true
          type: string
        - name: username
          in: query
          description: Desired username of the new member
          required: true
          type: string
        - name: password
          in: query
          description: Desired password of the new member
          required: true
          type: string
          
      # Expected responses for this operation:
      responses:
        # Response code
        200:
          description: Successfully created a new member
          schema:
            properties:
              token:
                type: string
              member_id:
                type: string
        400:
          description: Malformed JSON
          
  /makeTransaction:
    post:
      description: |
        Makes a transactions for a member's account
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: member_id
          in: query
          description: Members's id number
          required: true
          type: string
        - name: token
          in: query
          description: The user's token
          required: true
          type: string
        - name: type
          in: query
          description: the type of transaction (purchase, transfer, withdraw, deposit)
          required: true
          type: string
        - name: amount
          in: query
          description: Desired password of the new member
          required: true
          type: string
          
      responses:
        200:
          description: Successfully made transaction
        400:
          description: Malformed JSON
        401:
          description: Invalid or no token provided
          
  /getAccounts:
    post:
      description: |
        Get's the member's accounts
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: member_id
          in: query
          description: Members's id number
          required: true
          type: string
        - name: token
          in: query
          description: The user's token
          required: true
          type: string
          
      responses:
        200:
          description: Successfully received all member's accounts
        400:
          description: Malformed JSON
        401:
          description: Invalid or no token provided
          
  /createAccount:
    post:
      description: |
       Creates a new account for the given member
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - name: member_id
          in: query
          description: Members's id number
          required: true
          type: string
        - name: token
          in: query
          description: The user's token
          required: true
          type: string
        - name: account_name
          in: query
          description: The name fore the new account
          required: true
          type: string
        - name: account_type
          in: query
          description: The type of account to be made (savings, checkings)
          required: true
          type: string
          
      # Expected responses for this operation:
      responses:
        # Response code
        200:
          description: Successfully created account
        400:
          description: Malformed JSON
        401:
          description: Invalid or no token provided
    
*/