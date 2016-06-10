import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router';
import * as FontAwesome from 'react-fontawesome';
import './../../../node_modules/font-awesome/css/font-awesome.css';
import * as Select from 'react-select';
import './../../../node_modules/react-select/dist/react-select.css';
import * as $ from 'jquery';

var Settings = require('./../../constraints/settings.json');
import * as styles from './location-name.component.css';
import { LocationModel, locationStore } from './../../stores/location.store';
import { locationActions } from './../../actions/location.actions';


export interface ILocationNameProps {
  location: LocationModel;
  editable: boolean;
  async: boolean;
}
export interface ILocationNameStatus {
  name?: string;
  editing?: boolean;
}

export default class LocationNameComponent extends React.Component<ILocationNameProps, ILocationNameStatus> {
  constructor(props : ILocationNameProps) {
    super(props);
    let self: LocationNameComponent = this;
    this.state = {
      name: "",
      editing: false,
    };
  }
  public componentDidMount() {
    let self: LocationNameComponent = this;
    self.updateProps(self.props);
  }
  public componentWillUnmount() {
    let self: LocationNameComponent = this;
  }
  public componentWillReceiveProps (nextProps: ILocationNameProps) {
    let self: LocationNameComponent = this;
    self.updateProps(nextProps);
  }

  private updateProps(props: ILocationNameProps) {
    let self: LocationNameComponent = this;
    if (props.location) {
      if (props.location.getName().trim() != "") {
        self.setState({name: props.location.getName().trim(), editing: false});
      } else {
        self.setState({name: "", editing: false});
      }
    }
  }

  private updateAttribute = () => {
    let self: LocationNameComponent = this;
    self.props.location.setName(self.state.name);
    if (self.props.async) {
      locationActions.updateLocation(self.props.location);
    } else {
      self.setState({editing: false});
    }
  }

  render() {
    let self: LocationNameComponent = this;
    if (self.state.editing) {
      return (
        <div className={styles.wrapper}>
          <img className={styles.icon} src={Settings.uBaseName + Settings.uStaticImage + Settings.uTemporaryLocationMarkerIcon} />
          <div className={styles.name} onClick={()=> {
            self.setState({name: self.state.name, editing: true});
          }}>
            <input autoFocus type="text" key={self.props.location.getId() + "description"} placeholder="enter description of tree..."
              value={self.state.name}
              onChange={(event: any)=> {
                self.setState({name: event.target.value, editing: self.state.editing});
              }}
              onKeyPress={(event)=> {
                if (event.key == 'Enter') {
                  self.updateAttribute();
                }
              }}
              onBlur={()=> {
                self.updateAttribute();
              }} />
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapper}>
          <img className={styles.icon} src={Settings.uBaseName + Settings.uStaticImage + Settings.uTemporaryLocationMarkerIcon} />
          <div className={styles.name} onClick={()=> {
            self.setState({name: self.state.name, editing: true});
          }}>
            {self.state.name + " "}
          </div>
        </div>
      );
    }
  }
}