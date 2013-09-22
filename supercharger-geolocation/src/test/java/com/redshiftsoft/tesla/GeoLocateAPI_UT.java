package com.redshiftsoft.tesla;

import com.redshiftsoft.tesla.model.GeoLocateResponse;
import org.junit.Test;

import java.io.IOException;

public class GeoLocateAPI_UT {

    @Test
    public void test() throws IOException {

        GeoLocateResponse result = new GeoLocateAPI().locate("1600+Amphitheatre+Parkway,+Mountain+View,+CA");

        System.out.println("result=" + result);

    }

}
