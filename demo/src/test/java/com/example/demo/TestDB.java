package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;

public class TestDB {
    public static void main(String[] args) {
         String url = "jdbc:postgresql://db.nlqbcicjqyvhywynxzdy.supabase.co:5432/postgres?sslmode=require";
        String username = "postgres";
        String password = "YourSupabasePassword";

        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            System.out.println("Connection successful!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
