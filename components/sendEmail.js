/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sendEmail = async (title, selleremail, sellername) => {
  // Fetch User's fullname from Async Storage
  const fetchBookInfo = async () => {
    try {
      const storedBookInfo = await AsyncStorage.getItem('userData');
      if (storedBookInfo !== null) {
        const { fullname } = JSON.parse(storedBookInfo);
        return fullname;
      }
      console.log('No user data found in AsyncStorage');
      return null;
    } catch (error) {
      console.error('Error fetching book info from AsyncStorage:', error);
    }
  };

  const buyerName = await fetchBookInfo(); // Wait for the promise to resolve
  const subject = 'ChapterCache: A Buyer is Interested in Your Book!';

  let body = `Hello ${sellername}! %0A %0A My name is ${buyerName}. I am interested in buying your textbook: ${title}. %0A %0A Please let me know if the book is still available. %0A %0A Looking forward to your reply! %0A %0A Thanks!`;

  if (Platform.OS === 'ios') {
    // For iOS, use a different email client
    body = `Hello ${sellername}!%0A%0AMy name is ${buyerName}. I am interested in buying your textbook: ${title}.%0A%0APlease let me know if the book is still available.%0A%0ALooking forward to your reply!%0A%0AThanks!`;
    Linking.openURL(`mailto:${selleremail}?subject=${subject}&body=${body}`);
  } else {
    // For Android, use the ms-outlook URL
    Linking.openURL(`ms-outlook://emails/new?to=${selleremail}&subject=${subject}&body=${body}`)
      .then(() => {
        setTimeout(
          () => {
          // Go back to the Outlook to finish sending email.
            Linking.openURL('ms-outlook://emails');
          },
          10,
        );
      });
  }
};

export default sendEmail;
