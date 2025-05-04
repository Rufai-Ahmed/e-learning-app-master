import { combineReducers } from "redux";
import storeUserInfo from "./reducers/storeUserInfo";
import storeVerifyPhoneInfo from "./reducers/storeVerifyPhoneInfo";
import storeUserSession from "./reducers/storeUserSession";
import storePaymentUrl from "./reducers/storePaymentUrl";
import storeBottomDrawerData from "./reducers/storeBottomDrawerData";
import storeIdentityDocument from "./reducers/storeIdentityDocument";
import storeCardDetails from "./reducers/storeCardDetails";
import storeSuccessData from "./reducers/storeSuccessData";
import storeWalletBalance from "./reducers/storeWalletBalance";
import storeNotificationData from "./reducers/storeNotificationData";
import storeTransferFundsData from "./reducers/storeTransferFundsData";
import storeTransactionHistoryDataSlice from "./reducers/storeTransactionHistory";
import storeBanksDataSlice from "./reducers/storeBankDetails";
import storeBillsReceiptDataSlice from "./reducers/storeBillsReceiptData";
import storeFlightBookingsDataSlice from "./reducers/storeFlightBookings";
import storeThemeDataSlice from "./reducers/storeThemeData";
import storeUserFingerprintSlice from "./reducers/storeUserFingerprint";
import storeNetworkProvidersSlice from "./reducers/storeNetworkProviders";
import storeTransactionsDataSlice from "./reducers/storeTransactionsData";
import storeGiftCardDatasSlice from "./reducers/storeGiftCardData";
import storeSelectedCurrencyDataSlice from "./reducers/storeSelectedCurrency";
import storeUserVirtualAccountsSlice from "./reducers/storeUserVirtualAccounts";
import storeCoursesSlice from "./reducers/storeUserCourses";
import storeInstructorCoursesSlice from "./reducers/storeInstructorCourses";
import storeSearchDataSlice from "./reducers/storeSearchData";
import storeLessonProgress from "./reducers/storeLessonProgress";

export const rootReducer = combineReducers({
  user: storeUserInfo,
  verifyPhone: storeVerifyPhoneInfo,
  session: storeUserSession,
  paymentGateUrl: storePaymentUrl,
  bottomDrawer: storeBottomDrawerData,
  identityDocument: storeIdentityDocument,
  cardDetails: storeCardDetails,
  successData: storeSuccessData,
  walletBalance: storeWalletBalance,
  notification: storeNotificationData,
  transferFunds: storeTransferFundsData,
  transactionHistory: storeTransactionHistoryDataSlice,
  banks: storeBanksDataSlice,
  receiptData: storeBillsReceiptDataSlice,
  flightBooking: storeFlightBookingsDataSlice,
  theme: storeThemeDataSlice,
  userFingerprint: storeUserFingerprintSlice,
  networkProviders: storeNetworkProvidersSlice,
  transactionData: storeTransactionsDataSlice,
  giftCardData: storeGiftCardDatasSlice,
  selectedCurrency: storeSelectedCurrencyDataSlice,
  userVirtualAccounts: storeUserVirtualAccountsSlice,
  courses: storeCoursesSlice,
  instructorCourses: storeInstructorCoursesSlice,
  searchData: storeSearchDataSlice,
  lessonProgress: storeLessonProgress,
});
