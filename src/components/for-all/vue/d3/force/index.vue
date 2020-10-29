<template>
  <div class="graphBox" id="main">
    <ul class="tip">
      <li v-for="item in legend" :key="item.name" @click="legendClick(item)">
        <img :src="item.img" alt="" width="20" v-if="item.img" />
        <span
          v-else
          class="circle"
          :style="{ backgroundColor: item.checked ? item.color : '#b7b7b7' }"
        ></span>
        <span :style="{ color: item.checked ? '#fff' : '#b7b7b7' }">{{
          item.name
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: { name: "flare", children: Array(10) },
      height: 600
    };
  },
  mounted() {
    this.chart();
  },
  methods: {
    //创建图形
    chart() {
      const root = d3.hierarchy(data);
      const links = root.links();
      const nodes = root.descendants();

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink(links)
            .id(d => d.id)
            .distance(0)
            .strength(1)
        )
        .force("charge", d3.forceManyBody().strength(-50))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

      const svg = d3
        .create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

      const link = svg
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line");

      const node = svg
        .append("g")
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("fill", d => (d.children ? null : "#000"))
        .attr("stroke", d => (d.children ? null : "#fff"))
        .attr("r", 3.5)
        .call(drag(simulation));

      node.append("title").text(d => d.data.name);

      simulation.on("tick", () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        node.attr("cx", d => d.x).attr("cy", d => d.y);
      });

      invalidation.then(() => simulation.stop());

      return svg.node();
    },
    drag(simulation) {
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }
};
</script>

<style>
.graphBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tip {
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 12px;
}
li {
  padding: 2px 0px;
  cursor: pointer;
}
.circle {
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: red;
  margin: 0px 5px;
}
svg {
  background: #041928;
}

text {
  pointer-events: none;
  user-select: none;
}

.node:hover {
  cursor: pointer;
}

.link {
  stroke-opacity: 1;
  stroke-width: 2;
  cursor: pointer;
}
.link-active {
  stroke-opacity: 1;
  stroke-width: 3;
}
.linetext {
  font-family: Microsoft YaHei;
  fill: #fff;
}

.pie {
  cursor: pointer;
  fill: #fff;
}
.pie:hover {
  fill: #00a8bc;
}
.pie:hover .pieText {
  fill: #fff;
}
.pieText {
  cursor: pointer;
  fill: black;
  font-size: 12px;
}
</style>
