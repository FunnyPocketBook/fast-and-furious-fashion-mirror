<template>
    <div class="about-page">
        <v-container>
            <v-row>
                <!-- Text Column General about -->
                <v-col>
                    <h1>About</h1>
                    <p>This dashboard is useful for finding out which top brands reveal what their business practices are.
                    </p>
                    <p>While it does not explicitly state whether the brand’s practices are good or bad, it is typically the
                        case that a brand does not disclose their protocols if they are not ethical.</p>
                    <p>Thus, this tool can help to reveal what brands are transparent, and therefore, most likely have
                        ethical business practices.</p>
                </v-col>
            </v-row>

            <v-row>
                <!-- Text Column Dataset about-->
                <v-col cols="12" md="8">
                    <h2>Our Dataset</h2>
                    <p>We used data from The Fashion Transparency Index, a tool which reviews and ranks 250 of the biggest
                        global fashion and apparel brands and retailers.</p>
                    <p>It looks at how much information they disclose about their suppliers, supply chain policies and
                        practices, and social and environmental impact. It has been publishing findings every year since
                        2017, and the number of brands involved increases every year.</p>
                    <p>You can learn more about it here: <a href="https://www.fashionrevolution.org/about/transparency/"
                            target="_blank">www.fashionrevolution.org/about/transparency/</a></p>
                </v-col>

                <!-- Image Column -->
                <v-col cols="12" md="4">
                    <v-img :src="aboutImageUrl" alt="Fashion Transparency Index" class="image elevation-2"></v-img>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
  
<script>
import aboutImageUrl from '../assets/about.svg';

export default {
    name: 'About',
    data() {
        return {
            aboutImageUrl,
        };
    }
};
</script>
  
<style scoped>
.about-page {
    color: white;
    background-size: contain;
    background-position: top center;
    min-height: 100vh;
    width: 100%;
    padding-top: 100px;
}

h1,
h2 {
    margin-bottom: 16px;
}

p {
    line-height: 1.6;
    margin-bottom: 16px;
}
</style>
  

  

  