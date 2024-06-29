# Generated by Django 5.0.6 on 2024-06-29 19:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_sublesson'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assessment',
            name='answer',
        ),
        migrations.RemoveField(
            model_name='assessment',
            name='option_1',
        ),
        migrations.RemoveField(
            model_name='assessment',
            name='option_2',
        ),
        migrations.RemoveField(
            model_name='assessment',
            name='option_3',
        ),
        migrations.RemoveField(
            model_name='assessment',
            name='option_4',
        ),
        migrations.RemoveField(
            model_name='assessment',
            name='question',
        ),
        migrations.AddField(
            model_name='assessment',
            name='lesson',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assessments', to='courses.lesson'),
        ),
        migrations.AlterField(
            model_name='assessment',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='final_assessments', to='courses.course'),
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.TextField()),
                ('answer', models.CharField(max_length=100)),
                ('option_1', models.CharField(default='Default option 1', max_length=100)),
                ('option_2', models.CharField(default='Default option 2', max_length=100)),
                ('option_3', models.CharField(default='Default option 3', max_length=100)),
                ('option_4', models.CharField(default='Default option 4', max_length=100)),
                ('assessment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='courses.assessment')),
            ],
        ),
    ]
