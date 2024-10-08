<script setup lang="ts">
import { injectStrict } from "@/utils";
import { activeScenarioKey } from "@/components/injects";
import { computed } from "vue";
import { NScenarioEvent } from "@/types/internalModels";
import PanelHeading from "@/components/PanelHeading.vue";
import { useTimeFormatStore } from "@/stores/timeFormatStore";

interface Props {
  selectOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), { selectOnly: false });
const emit = defineEmits(["event-click"]);

const {
  store,
  time: { goToScenarioEvent },
} = injectStrict(activeScenarioKey);

const fmt = useTimeFormatStore();
const events = computed(() => store.state.events.map((id) => store.state.eventMap[id]));
const t = computed(() => store.state.currentTime);

function onEventClick(event: NScenarioEvent) {
  if (!props.selectOnly) goToScenarioEvent(event);
  emit("event-click", event);
}
</script>
<template>
  <div class="">
    <PanelHeading>Scenario events</PanelHeading>

    <div class="flow-root">
      <ul class="mt-4">
        <li v-for="(event, eventIdx) in events" :key="event.id">
          <div class="relative pb-4">
            <span
              v-if="eventIdx !== events.length - 1"
              class="absolute left-2 top-2 -ml-px h-full w-0.5 bg-gray-200"
              aria-hidden="true"
            />
            <div class="relative flex space-x-4">
              <button
                @click="onEventClick(event)"
                class="mt-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white"
                :class="{
                  'bg-amber-500': event.startTime > t,
                  'bg-gray-300': event.startTime < t,
                  'bg-red-900': event.startTime === t,
                }"
              ></button>
              <div
                class="min-w-0 flex-1 cursor-pointer text-sm"
                @click="onEventClick(event)"
              >
                <p class="text-xs font-medium text-red-900">
                  {{ fmt.scenarioDateFormatter.format(event.startTime) }}
                </p>
                <p class="font-medium">{{ event.title }}</p>
                <p v-if="event.subTitle" class="text-gray-700">
                  {{ event.subTitle }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
