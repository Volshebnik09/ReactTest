import React from 'react';

type Color = {
  hex: string;
}

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

type State = {
  paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {

  public getModel():Model {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  public render() {
    return (
      <div>
        {this.props.params.map(p => {
          return this.renderFieldByParam(p)
        })}
      </div>
    );
  }

  private getModelValue(paramId: number) {
    const paramValue = this.props.model.paramValues.find(p => p.paramId === paramId);
    if (!paramValue) {
      throw new Error('ParamValue not found');
    }
    return paramValue.value;
  }

  private renderFieldByParam(param: Param) {
    if (param.type === 'string') {
        return this.renderStringField(param);
    } else {
        throw new Error('Unknown param type');
    }
  }

  private updateParamValue(paramId: number, value: string) {
    const paramValue = this.props.model.paramValues.find(p => p.paramId === paramId);
    if (!paramValue) {
      throw new Error('ParamValue not found');
    }
    paramValue.value = value;
    this.setState({
      paramValues: this.props.model.paramValues
    });
  }

  private renderStringField(param: Param) {
    return (
      <div key={param.id}>
        {this.renderDefaultLabel(param)}
        <input
          value={this.getModelValue(param.id)}
          onChange={e => {
            this.updateParamValue(param.id, e.target.value);
          }}
        />
      </div>
    );
  }

  private renderDefaultLabel(param: Param) {
    return (
      <label style={{
        width: "100px",
        textAlign:'center',
        display:'inline-block',
      }}>
        {param.name}
      </label>
    )
  }
}

export {ParamEditor};