import React, { useEffect, useState } from 'react';
import Tips from './Tips';


const TipsPage: React.FC = () => {
    const clientId = 'lMJ7wdS2looOAxZ4aoirfTVnIYWJFgttkYMznkzU';
  const clientSecret = 'DxuFUhcXHOGp5C5xoEb93LTiXiRETFtQ7aCxNq62wFCLP8aEjpwIYiueVhGgxSRJFfm9kXD1PasDbeSTz5pddSLWD4r3oKJGDc6eSrfCQgHG9S9m7SQny3XtTxpHgM6K';
  const searchQuery = 'java';

  // Construct the URL with the search query
  const apiUrl = `https://www.udemy.com/api-2.0/courses/?page=1&page_size=12`;

  // Create a basic authentication header with your client ID and secret
  const base64Credentials = btoa(`${clientId}:${clientSecret}`);
  const headers = new Headers({
    "Accept": "application/json, text/plain, */*",
    "Authorization": "Basic IGxNSjd3ZFMybG9vT0F4WjRhb2lyZlRWbklZV0pGZ3R0a1lNem5relU6IER4dUZVaGNYSE9HcDVDNXhvRWI5M0xUaVhpUkVURnRRN2FDeE5xNjJ3RkNMUDhhRWpwd0lZaXVlVmhHZ3hTUkpGZm05a1hEMVBhc0RiZVNUejVwZGRTTFdENHIzb0tKR0RjNmVTcmZDUWdIRzlTOW03U1FueTNYdFR4cEhnTTZL",
    "Content-Type": "application/json"
  });

  useEffect(() => {
   
  }, [])

  return (
    <>
        <Tips uid={''} cards={[]} />
    </>
  )


}

export default TipsPage;