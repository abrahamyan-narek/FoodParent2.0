import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Link } from 'react-router';
import * as FontAwesome from 'react-fontawesome';
import './../../node_modules/font-awesome/css/font-awesome.css';
import * as AltContainer from 'alt-container';

var Settings = require('./../constraints/settings.json');
import * as styles from './trees-panel.component.css';
import TreeComponent from './tree/tree.component';
import { TreeModel, treeStore } from './../stores/tree.store';
import { FoodModel, foodStore } from './../stores/food.store';
import { addLoading, removeLoading } from './../utils/loadingtracker';
import { checkLogin, checkAdmin } from './../utils/authentication';
import { LogInStatus } from './app.component';

export interface ITreesPanelProps {
  treeId: number;
  foods: Array<FoodModel>;
  trees: Array<TreeModel>;
  zoom: number;
  onZoom: Function;
}
export interface ITreesPanelStatus {
  login: LogInStatus;
  userId: number;
  open: boolean;
}
export default class TreesPanelComponent extends React.Component<ITreesPanelProps, ITreesPanelStatus> {
  static contextTypes: any;
  constructor(props : ITreesPanelProps) {
    super(props);
    let self: TreesPanelComponent = this;
    this.state = {
      login: LogInStatus.GUEST,
      userId: null,
      open: false,
    };
  }
  public componentDidMount() {
    let self: TreesPanelComponent = this;
    self.updateProps(self.props);
  }
  public componentWillUnmount() {
    let self: TreesPanelComponent = this;
  }
  public componentWillReceiveProps (nextProps: ITreesPanelProps) {
    let self: TreesPanelComponent = this;
    self.updateProps(nextProps);
  }

  private updateProps = (props: ITreesPanelProps) => {
    let self: TreesPanelComponent = this;
    if (props.trees.length != 0 && props.foods.length != 0) {
      var tree: TreeModel = treeStore.getTree(props.treeId);
      let open: boolean = false;
      if (tree) {
        open = true;
      }
      addLoading();
      checkLogin(function(response1) { // login
        checkAdmin(function(response2) { // Admin
          console.log("manager");
          removeLoading();
          self.setState({login: LogInStatus.MANAGER, userId: parseInt(response1.id), open: open});
        }, function(response) { // Parent
          console.log("parent");
          removeLoading();
          self.setState({login: LogInStatus.PARENT, userId: parseInt(response1.id), open: open});
        }, function(response) { // Error
          removeLoading();
        });
      }, function(response) { // Not logged in
        removeLoading();
        console.log("guest");
        self.setState({login: LogInStatus.GUEST, userId: parseInt(response.id), open: open});
      }, function(response) { // Error
        removeLoading();
      });
    }
  }

  render() {
    let self: TreesPanelComponent = this;
    if (self.state.open) {
      return (
        <div className={styles.wrapper + " " + styles.slidein}>
          <div className={styles.left}>
            <div className={styles.button + " " + styles.buttontop}>
              <FontAwesome className='' name='location-arrow' />
            </div>
            <div className={styles.button} onClick={()=> {
              let zoom: number = Math.min(Settings.iMaxZoom, self.props.zoom + 1);
              self.props.onZoom(zoom);
            }}>
              <FontAwesome className='' name='search-plus' />
            </div>
            <div className={styles.button} onClick={()=> {
              let zoom: number = Math.max(Settings.iMinZoom, self.props.zoom - 1);
              self.props.onZoom(zoom);
            }}>
              <FontAwesome className='' name='search-minus' />
            </div>
            <div className={styles.button}>
              <FontAwesome className='' name='filter' />
            </div>
            <div className={styles.button + " " + styles.buttonbottom}>
              <FontAwesome className='' name='plus' />
            </div>
          </div>
          <div className={styles.right}>
            <TreeComponent login={self.state.login} userId={self.state.userId} treeId={self.props.treeId} foods={self.props.foods} trees={self.props.trees} />
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.button + " " + styles.buttontop}>
              <FontAwesome className='' name='location-arrow' />
            </div>
            <div className={styles.button} onClick={()=> {
              let zoom: number = Math.min(Settings.iMaxZoom, self.props.zoom + 1);
              self.props.onZoom(zoom);
            }}>
              <FontAwesome className='' name='search-plus' />
            </div>
            <div className={styles.button} onClick={()=> {
              let zoom: number = Math.max(Settings.iMinZoom, self.props.zoom - 1);
              self.props.onZoom(zoom);
            }}>
              <FontAwesome className='' name='search-minus' />
            </div>
            <div className={styles.button}>
              <FontAwesome className='' name='filter' />
            </div>
            <div className={styles.button + " " + styles.buttonbottom}>
              <FontAwesome className='' name='plus' />
            </div>
          </div>
          <div className={styles.right}>
          </div>
        </div>
      );
    }
  }
}

TreesPanelComponent.contextTypes = {
  router: function () {
    return React.PropTypes.func.isRequired;
  }
};
