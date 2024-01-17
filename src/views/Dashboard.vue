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
                    </div>
                    <v-btn large class="learn-more-btn">Learn more</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <Filter />
            </v-row>
        </v-container>
    </div>
</template>
  
<script>
import backgroundImage from '../assets/background.svg';
import Filter from '../components/Filter.vue';

export default {
    name: 'Dashboard',
    data() {
        return {
            backgroundImage
        };
    },
    components: {
        Filter
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

.learn-more-btn {
    padding: 10px 30px;
    border: none;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>
  