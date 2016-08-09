import React from 'react';
import ReactTooltip from 'react-tooltip';

require('./tree-control.component.scss');
let ServerSetting = require('./../../setting/server.json');

var FontAwesome = require('react-fontawesome');
let MapActions = require('./../actions/map.actions');
let MapSetting = require('./../../setting/map.json');
let MapStore = require('./../stores/map.store');
import { MAPTILE } from './../utils/enum';
import { localization } from './../utils/localization';


export default class TreeControl extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleToggleMapTile = this.handleToggleMapTile.bind(this);
  }
  componentWillMount() {
    this.setState({tile: "map-o"});
  }
  componentDidMount () {

  }
  componentWillReceiveProps() {
    if (MapStore.getMapTile(MapSetting.sTreeMapId) == MAPTILE.FLAT) {
      this.setState({tile: "map-o"});
    } else {
      this.setState({tile: "map"});
    }
  }
  handleMoveToUserLocation() {
    MapActions.moveToUserLocation.defer(MapSetting.sTreeMapId);
  }
  handleToggleMapTile() {
    if (MapStore.getMapTile(MapSetting.sTreeMapId) == MAPTILE.FLAT) {
      MapActions.setTile.defer(MapSetting.sTreeMapId, MAPTILE.SATELLITE);
      this.setState({tile: "map"});
    } else {
      MapActions.setTile.defer(MapSetting.sTreeMapId, MAPTILE.FLAT);
      this.setState({tile: "map-o"});
    }
  }
  handleZoomIn() {
    let zoom = Math.min(MapSetting.iMaxZoom, MapStore.getZoom(MapSetting.sTreeMapId) + 1);
    MapActions.setZoom.defer(MapSetting.sTreeMapId, zoom);
  }
  handleZoomOut() {
    let zoom = Math.min(MapSetting.iMaxZoom, MapStore.getZoom(MapSetting.sTreeMapId) - 1);
    MapActions.setZoom.defer(MapSetting.sTreeMapId, zoom);
  }
  render () {
    let add = <div className="control-button" onClick={()=> {
      this.context.router.push({pathname: ServerSetting.uBase + '/addtree'});
    }}  data-tip={localization(85)}>
      <FontAwesome name="plus-square" />
    </div>;
    return (
      <div className="tree-control-wrapper">
        <div className="control-button" onClick={this.handleMoveToUserLocation} data-tip={localization(80)}>
          <FontAwesome name='location-arrow' />
        </div>
        <div className="control-button" onClick={this.handleToggleMapTile} data-tip={localization(81)}>
          <FontAwesome name={this.state.tile} />
        </div>
        <div className="control-button" onClick={this.handleZoomIn} data-tip={localization(82)}>
          <FontAwesome name='search-plus' />
        </div>
        <div className="control-button" onClick={this.handleZoomOut} data-tip={localization(83)}>
          <FontAwesome name='search-minus' />
        </div>
        <div className="control-button"  data-tip={localization(84)}>
          <FontAwesome name='sliders'/>
        </div>
        {add}
        <ReactTooltip effect="solid" place="left" />
      </div>
    );
  }
}

TreeControl.contextTypes = {
    router: React.PropTypes.object.isRequired
}
