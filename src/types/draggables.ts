import {
  NScenarioFeature,
  NScenarioLayer,
  NSideGroup,
  NUnit,
} from "@/types/internalModels";

const privateKey = Symbol("scenarioFeature");
const _scnFeatureLayerKey = Symbol("scenarioFeatureLayer");
const privateUnitDragKey = Symbol("unit");
const privateSideGroupKey = Symbol("sideGroup");

export type ScenarioFeatureDragItem = {
  [privateKey]: boolean;
  feature: NScenarioFeature;
};

export type ScenarioFeatureLayerDragItem = {
  [_scnFeatureLayerKey]: boolean;
  layer: NScenarioLayer;
};

export type UnitDragItem = {
  [privateUnitDragKey]: boolean;
  unit: NUnit;
};

export type SideGroupDragItem = {
  [privateSideGroupKey]: boolean;
  sideGroup: NSideGroup;
};

export function getSideGroupDragItem(
  data: Omit<SideGroupDragItem, typeof privateSideGroupKey>,
): SideGroupDragItem {
  return {
    [privateSideGroupKey]: true,
    ...data,
  };
}

export function isSideGroupDragItem(
  data: Record<string | symbol, unknown>,
): data is SideGroupDragItem {
  return Boolean(data[privateSideGroupKey]);
}

export function getUnitDragItem(
  data: Omit<UnitDragItem, typeof privateUnitDragKey>,
): UnitDragItem {
  return {
    [privateUnitDragKey]: true,
    ...data,
  };
}

export function isUnitDragItem(
  data: Record<string | symbol, unknown>,
): data is UnitDragItem {
  return Boolean(data[privateUnitDragKey]);
}

export function getScenarioFeatureDragItem(
  data: Omit<ScenarioFeatureDragItem, typeof privateKey>,
): ScenarioFeatureDragItem {
  return {
    [privateKey]: true,
    ...data,
  };
}

export function isScenarioFeatureDragItem(
  data: Record<string | symbol, unknown>,
): data is ScenarioFeatureDragItem {
  return Boolean(data[privateKey]);
}

export function getScenarioFeatureLayerDragItem(
  data: Omit<ScenarioFeatureLayerDragItem, typeof _scnFeatureLayerKey>,
): ScenarioFeatureLayerDragItem {
  return {
    [_scnFeatureLayerKey]: true,
    ...data,
  };
}

export function isScenarioFeatureLayerDragItem(
  data: Record<string | symbol, unknown>,
): data is ScenarioFeatureLayerDragItem {
  return Boolean(data[_scnFeatureLayerKey]);
}
