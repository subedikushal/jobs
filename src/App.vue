<script setup>
import { ref, onMounted } from 'vue'

const jobs = ref(null)
let selectedKeywords = ref([])

function removeSelectedKeyword(key) {
  selectedKeywords.value = selectedKeywords.value.filter(function(item) {
      return item !== key
  })
}


function clearSelectedKeywords() {
  selectedKeywords.value = []
}


function addToSelectedKeywords (e){
  console.log(e.target.innerText)
  if (!selectedKeywords.value.includes(e.target.innerText)) {
  selectedKeywords.value.push(e.target.innerText)
  }
}


function findCommonElements(arr1) {
    return selectedKeywords.value.every(item => arr1.includes(item))
}


async function fetchData() {
  jobs.value = null
  const res = await fetch(
"https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json"
  )
  jobs.value = await res.json()
}


onMounted(() => {
  fetchData()
})


</script>
<template>
    <!-- FILTERS -->
    <div v-if="selectedKeywords.length > 0 ">
      <div
        id="buttonContainer"
        class="flex flex-row items-center pl-5 relative container mx-auto my-5 h-24 bg-white rounded-lg keywords"
      >
          <!-- ACTIVE FILTERS WITH CROSS BUTTON -->
					<div  v-for="key in selectedKeywords" :key="key.id"
						class="bg-primary justify-self-start text-keyword ml-2 py-2 pl-2 keyword-btn"
					>
						{{key}}<span @click="removeSelectedKeyword(key)" class="close  bg-secondary p-2 ml-2 text-white cursor-pointer">x</span>
					</div>

          <!-- CLEAR BUTTON -->
          <div class="absolute right-0">
            <button @click="clearSelectedKeywords" 
                class="bg-primary  text-keyword p-2 mr-5 keyword-btn hover:bg-keyword hover:text-white"
              >
              Clear
            </button>
          </div>
      </div>
    </div>

    <!-- COMPANY ROW -->
    <div class = "flex flex-row relative container mx-auto justify-around my-5 bg-white rounded-lg" v-for="job in jobs" :key="job.id" >
      <!-- COMPANY LOGO + DETAILS -->
      <div v-if="findCommonElements(job.keywords) || selectedKeywords.length === 0 " class="flex flex-row h-48">
        <!-- COMPANY LOGO -->
        <div class="self-center mr-5">
            <img
              class="rounded-full h-32 w-32"
              :src=job.company_logo
              alt="logo"
            />
        </div>

        <!-- COMPANY DETAILS -->
        <div class="flex flex-col justify-center">
          <div class="">{{job.company}}</div>
          <div class="font-bold text-xl">{{job.position}}</div>
          <div class="flex justify-between flex-row w-72">
            <div>{{ Math.round((Date.now() - job.posted_on)/(86400000))}}d ago</div>
            <div class="self-center">-</div>
            <div>{{job.timing}}</div>
            <div class="self-center">-</div>
            <div>{{job.location}}</div>
          </div>
        </div>
      </div>
      <!-- KEYWORD SECTION -->
      <div v-if="findCommonElements(job.keywords) || selectedKeywords.length === 0" class="flex flex-row justify-between items-center w-64">
        <div  v-for="key in job.keywords" :key="key.id"
        >
        <!-- USING CONDITIONAL FOR ACTIVE FILTER KEYWORDS -->
        <button v-if="selectedKeywords.includes(key)" @click="addToSelectedKeywords"
          class="bg-secondary p-2 keyword-btn text-white rounded-md"
         >
          {{key}}
        </button>
        <button v-else-if="!selectedKeywords.includes(key)" @click="addToSelectedKeywords"
          class="bg-primary text-keyword p-2 keyword-btn rounded-md hover:bg-keyword hover:text-white"
         >
          {{key}}
        </button>
        </div>
      </div>
    </div>
</template>