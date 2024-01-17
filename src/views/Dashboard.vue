<template>
    <div class="dashboard" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <v-container>
            <v-row>
                <v-col cols="12" sm="10" md="8" class="text-left white--text">
                    <h1 class="text-h2 mb-4" style="font-weight: bold;">Fashion Brands: The Good, The
                        Bad, And The Ugly</h1>
                    <div class="subtitle-1 mb-6" style="max-width: 600px;">
                        Not all fashion brands are created equal. Find out which ones are the most transparent about their
                        practices.
                        <v-btn class="ml-3" variant="outlined" size="x-small">Learn more</v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <Filter />
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col align-self="center">
                    Final Score Overview
                    <div class="cart mt-2">
                        <BrandOveralScore />

                    </div>
                </v-col>
                <v-spacer></v-spacer>
                <v-col align-self="center">
                    Key Area Breakdown
                    <div class="cart mt-2">
                        <BrandByKeyAreaScore />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
  
<script>
import backgroundImage from '../assets/background.svg';
import Filter from '../components/Filter.vue';
import BrandByKeyAreaScore from '../components/BrandByKeyAreaScore.vue';
import BrandOveralScore from '../components/BrandOveralScore.vue';

export default {
    name: 'Dashboard',
    data() {
        return {
            backgroundImage,
        };
    },
    components: {
        Filter,
        BrandByKeyAreaScore,
        BrandOveralScore
    }
};
</script>
  
  
<style scoped>
.dashboard {
    color: white;
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
    width: 100%;
}

.cart {
    padding: 24px;
    border-radius: 4px;
    background-color: #424242;
}
</style>
  