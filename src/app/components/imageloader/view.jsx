import React from "react";

export default class ImageLoaderView {
    // static get overlayStyle() {
    //     if (this.state.width * this.state.height > 0) {
    //         let r = (this.state.containerWidth / this.state.width);
    //         return { height: this.state.height * r, width: this.state.width * r };
    //     }
    //     return null;
    // }

    static get imagePlaceholder() {
        return <img 
            ref="image"
            src={this.props.src} 
            className={ [this.styles.image, (this.state.loaded && this.styles.active)].join(" ") } 
            onLoad={this.loadHandler} />
    }

    static get loadPlaceholder() {
        return <h1 ref="placeholder" className={ [this.styles.overlay, ((!this.state.loaded) && this.styles.active)].join(" ") }> 
            <div className={this.styles.spinner + " la-line-scale la-2x"}>
                <div /><div /><div />
            </div>
        </h1>;
    }

    static render() {
        return <span className={ [this.props.className, this.styles.container].join(" ") }>
            {this.views.imagePlaceholder}
            {this.views.loadPlaceholder}
        </span>;
    }
}