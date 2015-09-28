import React from "react";
import marked from "marked";
import ItemsList from "../ItemsList";

export default {
    render() {
        return <div className={this.styles.wrapper}>
            <header className={this.styles.header}>
                <h1>{__NAME__}</h1>
                <h2>You're at : {
                        window.location.pathname
                            .replace(__BASEURL__, "")
                            .split("/").filter((it) => it).reduce(
                                (prev, it) => {return {
                                    prefix: prev.prefix + "/" + it,
                                    items:
                                        prev.items.push(<a href={prev.prefix + "/" + it} className={this.styles.link}>{it}</a>) &&
                                        prev.items.push(<span className={this.styles.div}>/</span>) &&
                                        prev.items,
                                }}, {items: [
                                    <span className={this.styles.div}>/</span>,
                                    <a href={__BASEURL__} className={this.styles.link}>{__NAME__}</a>,
                                    <span className={this.styles.div}>/</span>,
                                ], prefix: __BASEURL__.substr(0, __BASEURL__.length - 1)}).items}
                </h2>
            </header>
            <section className={this.styles.content}>
                <ItemsList items={this.props.files} />
            </section>
        </div>;
    },
};
