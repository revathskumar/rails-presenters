
## What about conditions? like

```erb
<% if @user.website.present? %>
  <%= link_to @user.website, @user.website %>
<% else %>
  <span class="none">None given</span>
<% end %>
```

<h2 class="fragment info">
  We usually do, Right?
</h2>