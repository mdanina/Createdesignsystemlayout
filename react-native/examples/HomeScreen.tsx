/**
 * Home Screen Example - React Native
 * Пример использования wellness компонентов
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import {
  GradientBackground,
  SerifHeading,
  WellnessCard,
  PillButton,
  MoodTracker,
  StatCard,
  Avatar,
  BottomNavigation,
  NavigationItem,
} from '../components';
import { spacing } from '../theme';

// Для примера иконок используем react-native-vector-icons
// import Icon from 'react-native-vector-icons/Feather';

export const HomeScreen: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<number>();
  const [activeTab, setActiveTab] = useState('home');

  // Пример навигации
  const navItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Главная',
      icon: <View style={{ width: 24, height: 24 }} />, // Замените на <Icon name="home" size={24} />
    },
    {
      id: 'mood',
      label: 'Настроение',
      icon: <View style={{ width: 24, height: 24 }} />, // <Icon name="heart" size={24} />
    },
    {
      id: 'stats',
      label: 'Статистика',
      icon: <View style={{ width: 24, height: 24 }} />, // <Icon name="bar-chart-2" size={24} />
    },
    {
      id: 'profile',
      label: 'Профиль',
      icon: <View style={{ width: 24, height: 24 }} />, // <Icon name="user" size={24} />
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <GradientBackground gradient="peachLavender">
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View>
                <SerifHeading size="large">Добро пожаловать</SerifHeading>
              </View>
              <Avatar
                initials="ВМ"
                size="medium"
                gradient="mintSky"
              />
            </View>
          </View>

          {/* Mood Tracker Card */}
          <WellnessCard gradient="creamPeach" padding="large" style={styles.card}>
            <SerifHeading size="medium" style={styles.cardTitle}>
              Как ваше настроение?
            </SerifHeading>
            <View style={styles.moodContainer}>
              <MoodTracker
                value={currentMood}
                onChange={setCurrentMood}
                showLabels={true}
              />
            </View>
            {currentMood && (
              <PillButton
                variant="primary"
                fullWidth
                onPress={() => console.log('Сохранено')}
                style={styles.saveButton}
              >
                Сохранить
              </PillButton>
            )}
          </WellnessCard>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <StatCard
                value="7"
                label="Дней подряд"
                change="+2"
                changeType="positive"
                gradient="mintSky"
              />
            </View>
            <View style={styles.statItem}>
              <StatCard
                value="85%"
                label="Позитивных дней"
                change="+5%"
                changeType="positive"
                gradient="roseYellow"
              />
            </View>
          </View>

          {/* Activities Card */}
          <WellnessCard padding="large" style={styles.card}>
            <SerifHeading size="medium" style={styles.cardTitle}>
              Рекомендуемые практики
            </SerifHeading>
            
            <PillButton
              variant="secondary"
              fullWidth
              onPress={() => {}}
              style={styles.activityButton}
            >
              🧘‍♀️ Медитация
            </PillButton>
            
            <PillButton
              variant="outline"
              fullWidth
              onPress={() => {}}
              style={styles.activityButton}
            >
              📝 Дневник
            </PillButton>
            
            <PillButton
              variant="ghost"
              fullWidth
              onPress={() => {}}
            >
              🎵 Расслабляющая музыка
            </PillButton>
          </WellnessCard>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation
          items={navItems}
          activeItem={activeTab}
          onChange={setActiveTab}
        />
      </GradientBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing[6],
    paddingBottom: spacing[24],
  },
  header: {
    marginBottom: spacing[8],
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    marginBottom: spacing[6],
  },
  cardTitle: {
    marginBottom: spacing[6],
  },
  moodContainer: {
    marginBottom: spacing[6],
  },
  saveButton: {
    marginTop: spacing[4],
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing[4],
    marginBottom: spacing[6],
  },
  statItem: {
    flex: 1,
  },
  activityButton: {
    marginBottom: spacing[3],
  },
});
