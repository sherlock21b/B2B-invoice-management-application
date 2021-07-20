package com.higradius;

import java.util.Date;

public class DatabasePojo {
	private String cust_number;
	private String name_customer;
	private String invoice_id;
	private Integer total_open_amount;
	private Date due_in_date;
	private Date predicted_date;
	private String notes;
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public Date getPredicted_date() {
		return predicted_date;
	}
	public void setPredicted_date(Date predicted_date) {
		this.predicted_date = predicted_date;
	}
	public String getCust_number() {
		return cust_number;
	}
	public void setCust_number(String cust_number) {
		this.cust_number = cust_number;
	}
	public String getName_customer() {
		return name_customer;
	}
	public void setName_customer(String name_customer) {
		this.name_customer = name_customer;
	}
	public String getInvoice_id() {
		return invoice_id;
	}
	public void setInvoice_id(String invoice_id) {
		this.invoice_id = invoice_id;
	}
	public Integer getTotal_open_amount() {
		return total_open_amount;
	}
	public void setTotal_open_amount(Integer total_open_amount) {
		this.total_open_amount = total_open_amount;
	}
	public Date getDue_in_date() {
		return due_in_date;
	}
	public void setDue_in_date(Date due_in_date) {
		this.due_in_date = due_in_date;
	}
	
	

}
