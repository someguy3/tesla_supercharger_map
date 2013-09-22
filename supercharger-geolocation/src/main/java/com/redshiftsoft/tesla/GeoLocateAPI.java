package com.redshiftsoft.tesla;

import com.google.gson.Gson;
import com.redshiftsoft.tesla.model.GeoLocateResponse;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

public class GeoLocateAPI {

    private static final String SERVICE_URL = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";

    Gson gson = new Gson();

    public GeoLocateResponse locate(String address) throws IOException {

        CloseableHttpClient httpClient = HttpClientBuilder.create().build();

        HttpGet httpGet = new HttpGet(SERVICE_URL + address);
        HttpResponse response = httpClient.execute(httpGet);
        HttpEntity responseEntity = response.getEntity();
        String responseString = EntityUtils.toString(responseEntity);


        GeoLocateResponse responseObject = gson.fromJson(responseString, GeoLocateResponse.class);

        return responseObject;

    }


}
