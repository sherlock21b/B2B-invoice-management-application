package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class SearchServlet
 */

public class SearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try(Connection connection=DBconn.initializeDatabase()){
			String invoice_id=request.getParameter("invoice_id");
//			System.out.println(invoice_id);
			String sql="SELECT `cust_number`,`name_customer`,`invoice_id`,`total_open_amount`,`due_in_date`,`clear_date`,`notes` FROM mytable " +"WHERE invoice_id LIKE ?";
			PreparedStatement stmt=connection.prepareStatement(sql);
			stmt.setString(1, "%" +invoice_id+ "%");
			ResultSet rs=stmt.executeQuery();
			List<DatabasePojo> data= new ArrayList<>();
			while (rs.next()) {
				DatabasePojo Data =new DatabasePojo();
				Data.setCust_number(rs.getString("cust_number"));
				Data.setDue_in_date(rs.getDate("due_in_date"));
				Data.setInvoice_id(rs.getString("invoice_id"));
				Data.setName_customer(rs.getString("name_customer"));
				Data.setTotal_open_amount(rs.getInt("total_open_amount"));
				Data.setPredicted_date(rs.getDate("clear_date"));
				Data.setNotes(rs.getString("notes"));
				data.add(Data);
			}
			
			stmt.close();
			Gson gson = new Gson();
			String JsonFile=gson.toJson(data);
			response.getWriter().append(JsonFile);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		doGet(request, response);
	}

}
