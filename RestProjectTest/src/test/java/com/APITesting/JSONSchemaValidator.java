package com.APITesting;
import static io.restassured.RestAssured.*; 
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

import org.testng.annotations.Test;
// Make a static to RestAssured Package


public class JSONSchemaValidator {

	@Test
	public void testGet1() {
		
		baseURI = "http://localhost:8888/";
		
		given().get("/users").
		then().
		assertThat().body(matchesJsonSchemaInClasspath("schema.json")).statusCode(200);
	}
}