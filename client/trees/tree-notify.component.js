import React from 'react';
import AltContainer from 'alt-container';

require('./tree-map.component.scss');

let MapStore = require('./../stores/map.store');
let TreeStore = require('./../stores/tree.store');
let TreeActions = require('./../actions/tree.actions');
let FoodActions = require('./../actions/food.actions');


import MapTree from './../maps/map-tree.component';
import TreeNotifyPanel from './tree-notify-panel.component';
import { MAPTYPE } from './../utils/enum';


export default class TreeNotify extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount() {
    if (MapStore.getState().latestMapType == MAPTYPE.DONATION) {
      TreeActions.fetchTrees();
    }
    this.updateProps(this.props);
  }
  componentDidMount () {

  }
  componentWillReceiveProps(nextProps) {
    this.updateProps(nextProps);
  }
  updateProps(props) {
    if (parseInt(props.params.treeId) > 0) {
      TreeActions.fetchTree.defer(parseInt(props.params.treeId));
    }
  }
  render () {
    return (
      <div className="tree-map-wrapper">
        <AltContainer stores={
          {
            location: function(props) {
              return {
                store: MapStore,
                value: MapStore.getState().location
              };
            },
            trees: function(props) {
              return {
                store: TreeStore,
                value: TreeStore.getState().trees
              }
            },
            selected: function(props) {
              return {
                store: TreeStore,
                value: TreeStore.getState().selected
              }
            }
          }
        }>
          <MapTree />
        </AltContainer>
        <TreeNotifyPanel open={true}/>
      </div>
    );
  }
}
