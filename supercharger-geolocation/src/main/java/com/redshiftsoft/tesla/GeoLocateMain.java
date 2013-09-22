package com.redshiftsoft.tesla;

import com.google.common.base.Charsets;
import com.google.common.base.Splitter;
import com.google.common.io.ByteStreams;
import com.redshiftsoft.tesla.model.GeoLocateResponse;

import java.io.IOException;
import java.io.InputStream;

public class GeoLocateMain {

    private static final String ADDRESS_LIST_RESOURCE = "/super_charger_address_list.txt";

    private GeoLocateAPI geoLocateAPI = new GeoLocateAPI();

    public static void main(String[] a) throws IOException {
        new GeoLocateMain().go();
    }

    public GeoLocateMain() {
    }

    private void go() throws IOException {
        InputStream inputStream = GeoLocateMain.class.getResourceAsStream(ADDRESS_LIST_RESOURCE);

        String content = new String(ByteStreams.toByteArray(inputStream), Charsets.UTF_8);

        for (String address : Splitter.on("\n").split(content)) {
            System.out.println("------------------------------------------------------------------");
            GeoLocateResponse response = geoLocateAPI.locate(address.trim().replaceAll(" ", "+"));
            System.out.println("orig address  : " + address);
            System.out.println("result        : " + response);
            System.out.println("status        : " + response.getStatus());
            System.out.println("formatted     : " + response.getResults().get(0).getFormattedAddress());
            System.out.println("geometry      : " + response.getResults().get(0).getGeometry());
            System.out.println("geometry type : " + response.getResults().get(0).getGeometry().getLocationType());
        }
    }

}
