{% set dum = "" -%}
{% for cine in data -%}
@@{{ cine.name }}@@
{% for date in cine._dates -%}
**{{ date.dayOfWeekLabel }} - {{ date.showDate }}**
    {% for type in date.bundles -%}
        {% for session in type.sessions -%}
        {{ session.showTime }}({{ session.screenName }} - available **{{ session.seatsAvailable }}**)<>{{ dum -}}
        {% endfor %}
{% endfor -%}
{%- endfor -%}
{%- endfor -%}