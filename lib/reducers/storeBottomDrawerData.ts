import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface storeBottomDrawerData {
  serviceNetworkData: any;
  dataBundleData: any;
  tvDrawerData: any;
  selectedTvData: any;
  electricityData: any;
  countriesData: any;
  selectedStateData: any;
  internetData: any;
  selectedCountryData: any;
  selectedInternationalAirtimeCountry: any;
  selectedInternationalAirtimeProductType: any;
  internationalAirtimeProductType: any;
  internationalAirtimeOperator: any;
  selectedInternationalAirtimeOperator: any;
  flightDepartureLocation: any;
  flightDestinationLocation: any;
  selectedFlightDepartureLocation: any;
  selectedFlightDestinationLocation: any;
  waecPaymentOption: any;
  jambPaymentOption: any;
  personalAccountInsurance: any;
  thirdPartyInsurance: any;
  homeInsurance: any;
  esimsData: any;
  selectedEsimsData: any;
  bettingData: any;
  internationalAirtimeCountries: any;
  internationalAirtimeOperatorPlans: any;
  selectedInternationalAirtimeOperatorPlans: any;
  educationPaymentOptions: any;
  selectedThirdPartyInsurance: any;
  thirdPartyInsurancePartyColorCodes: any;
  thirdPartyInsuranceEngineCapacity: any;
  selectedThirdPartyInsuranceEngineCapacity: any;
  thirdPartyInsuranceLocalGovAreaCode: any;
  selectedThirdPartyInsuranceLocalGovAreaCode: any;
  thirdPartyStateCode: any;
  selectedThirdPartyStateCode: any;
  thirdPartyMakeCode: any;
  thirdPartyVehicleModelCode: any;
  selectedThirdPartyVehicleModelCode: any;
  selectedThirdPartyInsurancePartyColorCodes: any;
  selectedThirdPartyInsuranceMakeCode: any;
  flightBookingOffersData: any;
  selectedFlightBookingData: any;
}

const initialState: storeBottomDrawerData = {
  serviceNetworkData: null,
  dataBundleData: null,
  tvDrawerData: null,
  selectedTvData: null,
  electricityData: null,
  countriesData: null,
  selectedStateData: null,
  internetData: null,
  selectedCountryData: null,
  selectedInternationalAirtimeCountry: null,
  selectedInternationalAirtimeProductType: null,
  internationalAirtimeProductType: null,
  flightDepartureLocation: [],
  flightDestinationLocation: [],
  selectedFlightDepartureLocation: null,
  selectedFlightDestinationLocation: null,
  jambPaymentOption: null,
  waecPaymentOption: null,
  homeInsurance: null,
  personalAccountInsurance: null,
  thirdPartyInsurance: null,
  esimsData: null,
  bettingData: null,
  internationalAirtimeCountries: null,
  internationalAirtimeOperator: null,
  selectedInternationalAirtimeOperator: null,
  internationalAirtimeOperatorPlans: null,
  selectedInternationalAirtimeOperatorPlans: null,
  selectedEsimsData: null,
  educationPaymentOptions: null,
  selectedThirdPartyInsurance: null,
  thirdPartyInsurancePartyColorCodes: null,
  selectedThirdPartyInsuranceEngineCapacity: null,
  thirdPartyInsuranceLocalGovAreaCode: null,
  selectedThirdPartyInsuranceLocalGovAreaCode: null,
  thirdPartyStateCode: null,
  selectedThirdPartyStateCode: null,
  thirdPartyInsuranceEngineCapacity: null,
  selectedThirdPartyVehicleModelCode: null,
  thirdPartyMakeCode: null,
  selectedThirdPartyInsuranceMakeCode: null,
  thirdPartyVehicleModelCode: null,
  selectedThirdPartyInsurancePartyColorCodes: null,
  flightBookingOffersData: null,
  selectedFlightBookingData: null,
};

export const storeBottomDrawerSlice = createSlice({
  name: "bottom drawer data",
  initialState,
  reducers: {
    getInternetDrawerItem: (state, action: PayloadAction<any>) => {
      state.internetData = action.payload;
    },
    getServiceNetworkData: (state, action: PayloadAction<any>) => {
      state.serviceNetworkData = action.payload;
    },
    getDataBundleData: (state, action: PayloadAction<any>) => {
      state.dataBundleData = action.payload;
    },
    getTvData: (state, action: PayloadAction<any>) => {
      state.tvDrawerData = action.payload;
    },
    getSelectedTvData: (state, action: PayloadAction<any>) => {
      state.selectedTvData = action.payload;
    },
    getElectricityData: (state, action: PayloadAction<any>) => {
      state.electricityData = action.payload;
    },
    getCountriesData: (state, action: PayloadAction<any>) => {
      state.countriesData = action.payload;
    },
    getSelectedCountriesData: (state, action: PayloadAction<any>) => {
      state.selectedCountryData = action.payload;
    },
    getSelectedInternationalAirtimeCountry: (
      state,
      action: PayloadAction<any>
    ) => {
      state.selectedInternationalAirtimeCountry = action.payload;
    },
    getSelectedInternationalAirtimeProductType: (
      state,
      action: PayloadAction<any>
    ) => {
      state.selectedInternationalAirtimeProductType = action.payload;
    },
    getInternationalAirtimeProductType: (state, action: PayloadAction<any>) => {
      state.internationalAirtimeProductType = action.payload;
    },
    getFlightDepartureLocationData: (state, action: PayloadAction<any>) => {
      state.flightDepartureLocation = action.payload;
    },
    getFlightDestinationLocationData: (state, action: PayloadAction<any>) => {
      state.flightDestinationLocation = action.payload;
    },
    getSelectedFlightDepartureLocationData: (
      state,
      action: PayloadAction<any>
    ) => {
      state.selectedFlightDepartureLocation = action.payload;
    },
    getPersonalAccoutInusurance: (state, action: PayloadAction<any>) => {
      state.personalAccountInsurance = action.payload;
    },
    getHomeInsuranceForm: (state, action: PayloadAction<any>) => {
      state.homeInsurance = action.payload;
    },
    getThirdPartInsurance: (state, action: PayloadAction<any>) => {
      state.thirdPartyInsurance = action.payload;
    },
    getEsimsData: (state, action: PayloadAction<any>) => {
      state.esimsData = action.payload;
    },
    getEducationPaymentOption: (state, action: PayloadAction<any>) => {
      state.educationPaymentOptions = action.payload;
    },
    getSelectedFlightDestinationLocationData: (
      state,
      action: PayloadAction<any>
    ) => {
      state.selectedFlightDestinationLocation = action.payload;
    },
    getJambPaymentOptionData: (state, action: PayloadAction<any>) => {
      state.esimsData = action.payload;
    },
    getBettingData: (state, action: PayloadAction<any>) => {
      state.bettingData = action.payload;
    },
    getInternationalAirtimeCountries: (state, action: PayloadAction<any>) => {
      state.internationalAirtimeCountries = action.payload;
    },
    getInternationalAirtimeOperator: (state, action: PayloadAction<any>) => {
      state.internationalAirtimeOperator = action.payload;
    },
    getSelectedInternationalAirtimeOperator: (
      state,
      action: PayloadAction<any>
    ) => {
      state.selectedInternationalAirtimeOperator = action.payload;
    },

    getSelectedInternationalAirtimeOperatorPlans: (
      state,
      action: PayloadAction<any>
    ) => {
      state.selectedInternationalAirtimeOperatorPlans = action.payload;
    },
    getInternationalAirtimeOperatorPlans: (
      state,
      action: PayloadAction<any>
    ) => {
      state.internationalAirtimeOperatorPlans = action.payload;
    },
    getSelectedEsimsData: (state, action: PayloadAction<any>) => {
      state.selectedEsimsData = action.payload;
    },
    getSelectedThirdPartyInsurance: (state, action: PayloadAction<any>) => {
      state.selectedThirdPartyInsurance = action.payload;
    },
    getSelectedThirdPartInsurancePartyCode: (
      state,
      action: PayloadAction<any>
    ) => {
      state.selectedThirdPartyInsurancePartyColorCodes = action.payload;
    },
    getThirdPartyInsurancePartyCode: (state, action: PayloadAction<any>) => {
      state.thirdPartyInsurancePartyColorCodes = action.payload;
    },
    getThirdPartyInsuranceEngineCapacity: (
      state,
      action: PayloadAction<any>
    ) => {
      state.thirdPartyInsuranceEngineCapacity = action.payload;
    },
    getSelectedThirdPartyInsuranceEngineCapacity: (
      state,
      action: PayloadAction<any>
    ) => {
      state.selectedThirdPartyInsuranceEngineCapacity = action.payload;
    },
    getThirdPartyInsuranceLocalGovAreaCode: (
      state,
      action: PayloadAction<any>
    ) => {
      state.thirdPartyInsuranceLocalGovAreaCode = action.payload;
    },
    getSelectedThirdPartyInsuranceLocalAreaCode: (
      state,
      action: PayloadAction<any>
    ) => {
      state.selectedThirdPartyInsuranceLocalGovAreaCode = action.payload;
    },
    getThirdPartyStateCode: (state, action: PayloadAction<any>) => {
      state.thirdPartyStateCode = action.payload;
    },
    getSelectedThirdPartyStateCode: (state, action: PayloadAction<any>) => {
      state.selectedThirdPartyStateCode = action.payload;
    },
    getThirdPartyMakeCode: (state, action: PayloadAction<any>) => {
      state.thirdPartyMakeCode = action.payload;
    },
    getSelectedThirdPartyMakeCode: (state, action: PayloadAction<any>) => {
      state.selectedThirdPartyInsuranceMakeCode = action.payload;
    },
    getThirdPartyVehicleModel: (state, action: PayloadAction<any>) => {
      state.thirdPartyVehicleModelCode = action.payload;
    },
    getSelectedThirdPartyVehicleModel: (state, action: PayloadAction<any>) => {
      state.selectedThirdPartyVehicleModelCode = action.payload;
    },
    getFlightBookingOffersData: (state, action: PayloadAction<any>) => {
      state.flightBookingOffersData = action.payload;
    },
    getSelectedFlightBookingData: (state, action: PayloadAction<any>) => {
      state.selectedFlightBookingData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getCountriesData,
  getInternationalAirtimeCountries,
  getEsimsData,
  getBettingData,
  getHomeInsuranceForm,
  getPersonalAccoutInusurance,
  getThirdPartInsurance,
  getSelectedFlightBookingData,
  getFlightBookingOffersData,
  getElectricityData,
  getSelectedTvData,
  getInternetDrawerItem,
  getTvData,
  getDataBundleData,
  getSelectedInternationalAirtimeCountry,
  getServiceNetworkData,
  getSelectedCountriesData,
  getSelectedInternationalAirtimeProductType,
  getFlightDepartureLocationData,
  getFlightDestinationLocationData,
  getSelectedFlightDepartureLocationData,
  getSelectedFlightDestinationLocationData,
  getJambPaymentOptionData,
  getEducationPaymentOption,
  getInternationalAirtimeProductType,
  getSelectedInternationalAirtimeOperator,
  getSelectedInternationalAirtimeOperatorPlans,
  getInternationalAirtimeOperatorPlans,
  getInternationalAirtimeOperator,
  getThirdPartyInsurancePartyCode,
  getSelectedThirdPartInsurancePartyCode,
  getSelectedThirdPartyInsuranceEngineCapacity,
  getSelectedThirdPartyInsuranceLocalAreaCode,
  getSelectedThirdPartyMakeCode,
  getSelectedThirdPartyStateCode,
  getSelectedThirdPartyVehicleModel,
  getThirdPartyInsuranceEngineCapacity,
  getThirdPartyInsuranceLocalGovAreaCode,
  getThirdPartyVehicleModel,
  getThirdPartyStateCode,
  getThirdPartyMakeCode,
  getSelectedEsimsData,
  getSelectedThirdPartyInsurance,
} = storeBottomDrawerSlice.actions;

export default storeBottomDrawerSlice.reducer;
