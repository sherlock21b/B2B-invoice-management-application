package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class AddServlet
 */
@WebServlet("/AddServlet")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try(Connection connection=DBconn.initializeDatabase()){
			 String cust_number=request.getParameter("cust_number");
			 String name_customer=request.getParameter("name_customer");
			 String invoice_id=request.getParameter("invoice_id");
			 Integer total_open_amount=Integer.valueOf(request.getParameter("total_open_amount"));
			 DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			 Date due_in_date = dateFormat.parse(request.getParameter("due_in_date"));
//			 String s1=due_in_date.toString();
			 java.sql.Date sqlDate = new java.sql.Date( due_in_date.getTime() );
			 Date predicted_date=null;
			 String notes=request.getParameter("notes");
//			 System.out.println(cust_number);
			 String sql="INSERT INTO mytable VALUES(?,?,?,?,?,?,?)";
			 PreparedStatement stmt=connection.prepareStatement(sql);
			 stmt.setString(1,cust_number);
			 stmt.setString(2,name_customer);
			 stmt.setString(3,invoice_id);
			 stmt.setInt(4,total_open_amount);
			 stmt.setDate(5,sqlDate);
			 stmt.setDate(6,(java.sql.Date) predicted_date);
			 stmt.setString(7,notes);
			 stmt.executeUpdate();
			 stmt.close();
			 connection.close();
			 doGet(request, response);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	

}
