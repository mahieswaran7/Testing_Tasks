package com.APITesting;

import static io.restassured.RestAssured.baseURI;
import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;

import org.json.simple.JSONObject;
import org.testng.annotations.Test;

import io.restassured.http.ContentType;

public class CarRentPutRequest {

//@Test
public void PUTRequest() {
JSONObject request = new JSONObject();
request.put("name", "siva");
request.put("Job", "Developer");
System.out.println(request.toJSONString());

baseURI = "http://localhost:8888";
given().header("Content-type","application/json").contentType(ContentType.JSON).accept(ContentType.JSON).body(request.toJSONString()).put("/car/4398").then().statusCode(200).log().all();
}
//@Test
public void PATCHRequest() {
JSONObject request = new JSONObject();
request.put("name", "siva");
request.put("job", "Developer");
System.out.println(request.toJSONString());

baseURI = "http://localhost:8888";
given().header("Content-type","application/json").contentType(ContentType.JSON).accept(ContentType.JSON).body(request.toJSONString()).put("/car/4398").then().statusCode(200).log().all();
}
@Test
public void DELETERequest() {
baseURI = "http://localhost:8888";
when().delete("/car/17a2").then().statusCode(200).log().all();
}
}