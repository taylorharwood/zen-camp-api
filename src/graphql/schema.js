module.exports = `
  type Campground {
    contractID: String
    facilityID: String
    facilityName: String
    facilityPhoto: String
    availabilityStatus: String
    latitude: String
    longitude: String
    sitesWithWaterHookup: String
    sitesWithWaterfront: String
    state: String
  }

  type CampgroundDetail {
    alert: String
    contractId: String
    description: String
    drivingDirection: String
    facilitiesDescription: String
    facility: String
    facilityID: String
    importantInformation: String
    latitude: String
    longitude: String
    nearbyAttrctionDescription: String
    note: String
    recreationDescription: String
    regionName: String
    webUrl: String
  }

  type Query {
    getCampgrounds(
      latitude: String!, 
      longitude: String!, 
      siteType: String,
      amenity: String,
      maxpeople: String,
      waterfront: String
    ): [Campground]!

    getCampgroundDetail(parkId: String!, contractID: String!): CampgroundDetail!
  }
`;