# Generated by Django 5.0.6 on 2024-06-11 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='profile_image',
            field=models.ImageField(default='profile_image/default.jpg', null=True, upload_to='profile_images/'),
        ),
    ]
