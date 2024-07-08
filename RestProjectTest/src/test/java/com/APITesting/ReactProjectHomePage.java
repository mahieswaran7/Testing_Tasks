package com.APITesting;

import static org.hamcrest.Matchers.equalTo;

import org.testng.Assert;

import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;

import io.restassured.response.Response;



public class ReactProjectHomePage {

	//@Test

	public void  ReactpageApiTest() {

		Response response = get("http://localhost:8888");

		System.out.println(response.getStatusCode());

		System.out.println(response.getTime());

		System.out.println(response.getBody().asString());

		System.out.println(response.getStatusLine());

		System.out.println(response.getHeader("content-type"));

		

		int statuscode = response.getStatusCode();

		

		Assert.assertEquals(statuscode, 200);

		

	}
	@Test
	public void GETApiTest2() {
		
		baseURI="http://localhost:8888";
	//	given().get("/users?page=2").then().statusCode(200).body("data[1].id",equalTo(8)).log().all();
		given().get("/users").then().statusCode(200).body("[1].useremail",equalTo("siva123@gmail.com")).log().all();
	}




}