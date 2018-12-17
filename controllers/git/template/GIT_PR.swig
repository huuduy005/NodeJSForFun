{% macro getAction(eventKey) -%}
{% spaceless %}
{% switch eventKey %}
{% case "pr:merged" %}merged pull request
{% case "pr:opened" %}opened pull request
{% case "pr:comment:added" %}commented on pull request
{% case "pr:declined" %}declined pull request
{% endswitch %}
{% endspaceless %}
{%- endmacro -%}

{% block abc -%}
sdasdasdasdasd
{% endblock %}

{%- set _repository = pullRequest.fromRef|default(pullRequest.toRef) -%}
{%- set repository = _repository.repository -%}

[GIT] **{{actor.displayName}}** {{ getAction(eventKey) }} [(Link)](https://git.vexere.net/projects/{{repository.project.name}}/repos/{{repository.slug}}/pull-requests/{{pullRequest.id}}/overview)
Title - {{pullRequest.title}}
State: **{{pullRequest.state}}** | {{pullRequest.fromRef.displayId}} **=>** {{pullRequest.toRef.displayId}}
**Reviewers**: {{pullRequest.reviewers|map('user.displayName')|join(', ')-}}
{{abc}}