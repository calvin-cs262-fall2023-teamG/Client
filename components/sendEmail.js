import React, { useState, useEffect } from "react";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";




const sendEmail = () => {
  
  const [title, setTitle] = useState("");
  const [sellername, setSellername] = useState("");
  const [selleremail, setSelleremail] = useState("");

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const storedBookInfo = await AsyncStorage.getItem("bookInfo");
        if (storedBookInfo !== null) {
          console.log("Data retrieved successfully:", storedBookInfo);
        } else {
          const { title, sellername, selleremail } = JSON.parse(storedBookInfo);
          setTitle(title);
          setSellername(sellername);
          setSelleremail(selleremail);
        }
      } catch (error) {
        console.error("Error fetching book info from AsyncStorage:", error);
      }
    };
    fetchBookInfo();
  }, []);

  const buyerName = "Si Chan Park";
  const subject = "ChapterCache: A Buyer is Interested in Your Book!";

  const body =
    "Hello " +
    sellername +
    "! %0A %0A My name is " +
    buyerName +
    ". I am interested in buying your textbook: " +
    title +
    "." +
    " %0A %0A Please let me know if the book is still available." +
    " %0A %0A Looking forward to your reply!" +
    "%0A %0A Thanks!";

  Linking.openURL(
    "ms-outlook://emails/new?to=" +
      selleremail +
      "&subject=" +
      subject +
      "&body=" +
      body
  );

  //iOS = ms-outlook://compose?to...

  // const to = ['sp56@calvin.edu']
  // email(to, {
  //     subject: 'ChapterCache: A Buyer is Interested in Your Book!',
  //     body: '',
  //     checkCanOpen: false
  // }).catch(console.error)
};

export default sendEmail;
