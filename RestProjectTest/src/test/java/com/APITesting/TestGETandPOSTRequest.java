package com.APITesting;

import org.json.simple.JSONObject;
import org.testng.Assert;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;//Make a Static  to RestAssured Package

import io.restassured.http.ContentType;
import io.restassured.response.Response;
// Need Output in Json Formet
import static io.restassured.matcher.RestAssuredMatchers.*;
import static org.hamcrest.Matchers.*;

import java.util.HashMap;
import java.util.Map;

import javax.swing.text.AbstractDocument.Content;

public class TestGETandPOSTRequest {

//@Test
public void testGet1() {
baseURI="https://reqres.in/api";
given().get("/unknown").then().statusCode(200).body("data[1].id",equalTo(2) ).log().all();

given().get("/unknown").then().statusCode(200).body("data[0].name",equalTo("cerulean") ).body("data[1].id",equalTo(2)).log().all();
}
//@Test
public void GETRequest2() {
baseURI="https://reqres.in/api";
given().get("/users?page=2").then().statusCode(200).body("data.first_name",hasItems("Lindsay","Tobias") ).log().all();
}
@Test
public void POSTRequest1() {
Map<String,Object> map=new HashMap<String,Object>();
JSONObject request=new JSONObject(map);
request.put("name", "Eswaran");
request.put("job", "MD");
System.out.println(request.toJSONString());

baseURI="https://reqres.in/api";
given().header("Content-type","application/json").contentType(ContentType.JSON).accept(ContentType.JSON).body(request.toJSONString()).post("/users").then().statusCode(201).log().all();
}
}