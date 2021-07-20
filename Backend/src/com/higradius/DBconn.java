package com.higradius;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBconn {
	protected static Connection initializeDatabase()
	throws SQLException, ClassNotFoundException
	{
		String dbDriver="com.mysql.cj.jdbc.Driver";
		String dbUrl="jdbc:mysql://localhost:3306/sqlconnection";
		String User="root";
		String Pass="root";
		Class.forName(dbDriver);
		Connection con=DriverManager.getConnection(dbUrl,User,Pass);
		
		return con;
	}
	
 
 
 
}

