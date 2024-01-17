<!-- TODO: InProgress -->
<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="selectedBrands"
            :items="brands"
            label="Select brand(s)"
            multiple
            chips
          ></v-autocomplete>
          <v-list>
            <v-list-item v-for="brand in selectedBrands" :key="brand">
              <v-list-item-content>{{ brand }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
  
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedYears"
            :items="years"
            label="Select year(s)"
            multiple
          ></v-select>
          <v-list>
            <v-list-item v-for="year in selectedYears" :key="year">
              <v-list-item-content>{{ year }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
  
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedKeyAreas"
            :items="keyAreas"
            label="Select key area(s)"
            multiple
          ></v-select>
          <v-list>
            <v-list-item v-for="area in selectedKeyAreas" :key="area">
              <v-list-item-content>{{ area }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12">
          <div class="text-h6 py-4">What are the key areas?</div>
          <div>
            <div v-for="description in keyAreaDescriptions" :key="description.title" class="my-2">
              <div class="text-subtitle-1">{{ description.title }}</div>
              <div>{{ description.text }}</div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'SelectionComponent',
    data() {
      return {
        selectedBrands: [],
        brands: ['Zara', 'Primark', 'Nike', 'Hema', 'Gucci', 'H&M', 'Zalando'],
        selectedYears: [],
        years: ['2017', '2018', '2019', '2020', '2021', '2022'],
        selectedKeyAreas: [],
        keyAreas: ['Governance', 'Policies', 'Traceability', 'Know, Show, Fix', 'Spotlight Issues'],
        keyAreaDescriptions: [
          { title: 'Governance', text: 'Who is responsible for social and environmental impacts in the company?' },
          { title: 'Policies', text: 'What human rights, environmental policies, and procedures does the company publicly disclose?' },
          { title: 'Traceability', text: 'Is it easy to track their supply chain?' },
          { title: 'Know, Show, Fix', text: 'Do they disclose how they identify and resolve issues relating to human rights and the environment?' },
          { title: 'Spotlight Issues', text: 'Does the brand care about gender & racial equality, decent work & purchasing practices, sustainable sourcing & materials, over consumption of water, minimizing their water footprint, and climate change & biodiversity?' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  