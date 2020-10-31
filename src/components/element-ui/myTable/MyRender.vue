<script>
export default {
  functional: true,
  props: {
    row: Object,
    render: Function
  },
  render: (h, context) => {
    return context.props.render(h, {
      row: context.props.row
    });
  }
};
</script>