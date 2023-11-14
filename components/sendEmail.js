// This code will be used later!!!!!!!!!!!!!!!!!!!!
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';







const sendEmail = () => {

    const sellerName = 'HyeChan Lee'
    const buyerName = 'Si Chan Park'
    const sellerEmail = 'hl63@calvin.edu';
    const bookname = fetchBookInfo('title')
    const subject = 'ChapterCache: A Buyer is Interested in Your Book!';

    const body = 'Hello ' + sellerName + '! %0A %0A My name is ' + buyerName + 
                '. I am interested in buying your textbook: ' + bookname + '.'
                + ' %0A %0A Please let me know if the book is still available.' +
                ' %0A %0A Looking forward to your reply!' +
                '%0A %0A Thanks!';

    const fetchBookInfo = async (key) => {
        try {
          const storedBookInfo = await AsyncStorage.getItem(key);
          if (storedBookInfo !== null) {
            console.log('Data retrieved successfully:', storedBookInfo)
            return storedBookInfo;
          }
        } catch (error) {
          console.error('Error fetching book info from AsyncStorage:', error);
        }
      };

    

    Linking.openURL('ms-outlook://emails/new?to=' + sellerEmail + '&subject=' + subject + '&body=' + body)


    //iOS = ms-outlook://compose?to...


    // const to = ['sp56@calvin.edu']
    // email(to, {
    //     subject: 'ChapterCache: A Buyer is Interested in Your Book!',
    //     body: '',
    //     checkCanOpen: false
    // }).catch(console.error)
};



export default sendEmail;