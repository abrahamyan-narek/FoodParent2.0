import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Link } from 'react-router';
import * as FontAwesome from 'react-fontawesome';
import './../../../node_modules/font-awesome/css/font-awesome.css';
import * as AltContainer from 'alt-container';

var Settings = require('./../../constraints/settings.json');
import * as styles from './tree.component.css';
import { TreeModel, treeStore } from './../../stores/tree.store';
import { FoodModel, foodStore } from './../../stores/food.store';
import { FlagModel, flagStore } from './../../stores/flag.store';
import { OwnershipModel, ownershipStore } from './../../stores/ownership.store';
import FoodComponent from './food.component';
import AddressComponent from './address.component';
import DescriptionComponent from './description.component';
import FlagComponent from './flag.component';
import OwnershipComponent from './ownership.component';
import LocationComponent from './location.component';
import { LogInStatus } from './../app.component';

export interface ITreeProps {
  foods: Array<FoodModel>;
  trees: Array<TreeModel>;
  treeId: number;
  login: LogInStatus;
  userId: number;
}
export interface ITreeStatus {
  editable: boolean;
}
export default class TreeComponent extends React.Component<ITreeProps, ITreeStatus> {
  static contextTypes: any;
  constructor(props : ITreeProps) {
    super(props);
    let self: TreeComponent = this;
    this.state = {
      editable: false,
    };
  }
  public componentDidMount() {
    let self: TreeComponent = this;
    flagStore.fetchFlags();
    self.updateProps(self.props);
  }
  public componentWillUnmount() {
    let self: TreeComponent = this;
  }
  public componentWillReceiveProps (nextProps: ITreeProps) {
    let self: TreeComponent = this;
    self.updateProps(nextProps);
  }

  private updateProps = (props: ITreeProps) => {
    let self: TreeComponent = this;
    if (props.trees.length != 0 && props.foods.length != 0) {
      var tree: TreeModel = treeStore.getTree(props.treeId);
      let editable: boolean = false;
      if (tree) {
        if (props.login == LogInStatus.MANAGER || props.login == LogInStatus.ADMIN) {
          editable = true;
        } else {
          if (tree.getOwner() == props.userId) {
            editable = true;
          }
        }
        self.setState({editable: editable});
      }
    }
  }

  render() {
    let self: TreeComponent = this;
    if (self.props.treeId) {
      var tree: TreeModel = treeStore.getTree(self.props.treeId);
      var food: FoodModel = foodStore.getFood(tree.getFoodId());
      return (
        <div className={styles.wrapper}>
          <div className={styles.treeinfo}>
            <FoodComponent tree={tree} foods={self.props.foods} editable={self.state.editable} async={false} />
            <div className={styles.close}><FontAwesome className='' name='close' onClick={()=> {
              self.context.router.push({pathname: Settings.uBaseName + '/'});
              //self.setState({editable: self.state.editable});
            }}/></div>
          </div>
          <div className={styles.basicinfo}>
            <AltContainer stores={
              {
                flags: function (props) {
                  return {
                    store: flagStore,
                    value: flagStore.getState().flags
                  };
                },
                ownership: function (props) {
                  return {
                    store: ownershipStore,
                    value: ownershipStore.getState().ownerships
                  };
                }
              }
            }>
              <LocationComponent tree={tree} editable={self.state.editable} />
              <AddressComponent tree={tree} editable={self.state.editable} />
              <DescriptionComponent tree={tree} editable={self.state.editable} />
              <FlagComponent tree={tree} flags={flagStore.getState().flags} editable={self.state.editable} />
              <OwnershipComponent tree={tree} editable={self.state.editable} />
            </AltContainer>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapper}>
        </div>
      );
    }
  }
}

TreeComponent.contextTypes = {
  router: function () {
    return React.PropTypes.func.isRequired;
  }
};
