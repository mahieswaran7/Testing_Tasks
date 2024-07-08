package com.APITesting;

import static io.restassured.RestAssured.baseURI;

import static io.restassured.RestAssured.given;

import static io.restassured.RestAssured.*;

import org.json.simple.JSONObject;

import org.testng.annotations.Test;



import io.restassured.http.ContentType;



public class PutPatchAndDeleteRequest {



//	 @Test

	public void PUTRequest() {

		JSONObject request = new JSONObject();

		request.put("name", "Eswaran");

		request.put("job", "CEO");

		System.out.println(request.toJSONString());



		baseURI = "https://reqres.in/api";

		 given().header("Content-type","application/json").contentType(ContentType.JSON).accept(ContentType.JSON).body(request.toJSONString()).patch("/users/2").then().statusCode(200).log().all();

	}

	 @Test

	 public void PATCHRequest() {

		 JSONObject request = new JSONObject();

			request.put("name", "Eswaran");

			request.put("job", "CEO");

			System.out.println(request.toJSONString());



			baseURI = "https://reqres.in/api";

			 given().header("Content-type","application/json").contentType(ContentType.JSON).accept(ContentType.JSON).body(request.toJSONString()).put("/users/2").then().statusCode(200).log().all();

	 }

	 

	 public void DELETERequest() {

		 baseURI = "https://reqres.in";

		 when().delete("/users?page=2").then().statusCode(204).log().all();

	 }



}